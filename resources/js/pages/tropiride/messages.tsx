import TropirideLayout from '@/layouts/tropiride-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Loader2, MapPin } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { SharedData } from '@/types';

interface ChatDriver {
    id: number;
    name: string;
    age?: number;
    address?: string;
    phone?: string;
    avatar_url?: string;
}

interface ChatCustomer {
    id: number;
    name: string;
    phone?: string;
    avatar_url?: string;
}

interface ChatConversation {
    chat_booking_id: number;
    latest_booking_id: number;
    pickup_location: string;
    dropoff_location: string;
    status: string;
    vehicle_type?: string;
    passengers?: number;
    driver?: ChatDriver | null;
    customer?: ChatCustomer | null;
}

interface ChatMessage {
    id: number;
    message: string;
    sender_role: 'driver' | 'customer' | 'system';
    sender_name: string;
    sender_id: number;
    is_system: boolean;
    created_at: string;
}

interface MessagesPageProps {
    bookings: ChatConversation[];
    initialBookingId: number | null;
}

export default function MessagesPage({ bookings, initialBookingId }: MessagesPageProps) {
    const { auth } = usePage<SharedData>().props;
    const userId = auth.user?.id;

    const [activeBookingId, setActiveBookingId] = useState<number | null>(initialBookingId);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const csrfToken = typeof document !== 'undefined'
        ? document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? ''
        : '';
    const messagesRef = useRef<HTMLDivElement | null>(null);

    const activeBooking = useMemo(
        () => (activeBookingId ? bookings.find((booking) => booking.chat_booking_id === activeBookingId) || null : null),
        [bookings, activeBookingId],
    );

    useEffect(() => {
        if (!activeBookingId) {
            setMessages([]);
            return;
        }

        let isCurrent = true;

        const loadMessages = (silent = false) => {
            if (!silent) {
                setIsLoading(true);
                setError(null);
            }

            fetch(`/chat/bookings/${activeBookingId}/messages`, {
                headers: {
                    Accept: 'application/json',
                },
                credentials: 'same-origin',
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to load messages');
                    }
                    return response.json();
                })
                .then((data) => {
                    if (!isCurrent) return;
                    setMessages(data.messages ?? []);
                })
                .catch((err) => {
                    console.error(err);
                    if (!isCurrent) return;
                    if (!silent) {
                        setError('We could not load your messages. Please try again.');
                    }
                })
                .finally(() => {
                    if (!isCurrent) return;
                    if (!silent) {
                        setIsLoading(false);
                    }
                });
        };

        loadMessages();
        const interval = setInterval(() => loadMessages(true), 5000);

        return () => {
            isCurrent = false;
            clearInterval(interval);
        };
    }, [activeBookingId]);

    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        if (!bookings.length) {
            setActiveBookingId(null);
            return;
        }

        if (!activeBookingId || !bookings.some((booking) => booking.chat_booking_id === activeBookingId)) {
            setActiveBookingId(initialBookingId ?? bookings[0].chat_booking_id);
        }
    }, [bookings, activeBookingId, initialBookingId]);

    const handleSendMessage = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!activeBookingId || isSending) return;

        const trimmed = newMessage.trim();
        if (!trimmed) return;

        setIsSending(true);
        setError(null);

        try {
            const response = await fetch(`/chat/bookings/${activeBookingId}/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                    'X-Requested-With': 'XMLHttpRequest',
                },
                credentials: 'same-origin',
                body: JSON.stringify({ message: trimmed }),
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            const data = await response.json();
            if (data.message) {
                setMessages((prev) => [...prev, data.message]);
            }
            setNewMessage('');
        } catch (sendError) {
            console.error(sendError);
            setError('Unable to send your message. Please try again.');
        } finally {
            setIsSending(false);
        }
    };

    const formatTimestamp = (isoString: string) => {
        return new Date(isoString).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case 'completed':
                return 'default';
            case 'pending':
                return 'secondary';
            case 'in_progress':
                return 'outline';
            case 'cancelled':
                return 'destructive';
            default:
                return 'outline';
        }
    };

    const renderBookingButton = (booking: ChatConversation) => {
        const isActive = booking.chat_booking_id === activeBookingId;
        return (
            <button
                key={booking.chat_booking_id}
                onClick={() => setActiveBookingId(booking.chat_booking_id)}
                className={`w-full border rounded-xl p-4 text-left transition hover:border-cyan-400 ${
                    isActive ? 'border-cyan-500 shadow-lg shadow-cyan-500/10 bg-cyan-50' : 'border-gray-200 bg-white'
                }`}
            >
                <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-900">Booking #{booking.latest_booking_id}</span>
                    <Badge variant={getStatusBadgeVariant(booking.status)} className="text-[10px] capitalize">
                        {booking.status.replace('_', ' ')}
                    </Badge>
                </div>
                <p className="text-xs text-gray-600 flex items-center gap-1 truncate">
                    <MapPin className="h-3 w-3 text-cyan-500" />
                    {booking.pickup_location}
                </p>
                <p className="text-xs text-gray-500 ml-4 truncate">{booking.dropoff_location}</p>
                {booking.driver && (
                    <p className="text-xs text-gray-500 mt-2">Driver: {booking.driver.name}</p>
                )}
            </button>
        );
    };

    return (
        <TropirideLayout>
            <Head title="Messages - Tropiride" />
            <section className="bg-gradient-to-b from-cyan-50 to-white py-12">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                        <div>
                            <p className="text-sm font-semibold text-cyan-600 uppercase tracking-wide">Messaging Hub</p>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Stay Connected with Your Driver</h1>
                            <p className="text-gray-600 mt-2">
                                Once a driver accepts your ride, you can coordinate trip details here in real time.
                            </p>
                        </div>
                    </div>

                    {bookings.length === 0 ? (
                        <Card className="border-dashed border-2 border-gray-200 text-center py-16">
                            <CardContent className="space-y-4">
                                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto" />
                                <h3 className="text-xl font-semibold text-gray-800">No active conversations yet</h3>
                                <p className="text-gray-500 max-w-md mx-auto">
                                    Request a ride first. Once a driver accepts, we’ll automatically open a chat for both of you.
                                </p>
                                <Button asChild className="bg-gradient-to-r from-cyan-500 to-blue-600">
                                    <Link href="/tropiride/vehicles">Request a Ride</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid gap-6 lg:grid-cols-3">
                            <div className="space-y-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Bookings</CardTitle>
                                        <CardDescription>Select a ride to view its chat room</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        {bookings.map((booking) => renderBookingButton(booking))}
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="lg:col-span-2">
                                <Card className="h-full">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <MessageSquare className="h-5 w-5 text-cyan-600" />
                                            Conversation
                                        </CardTitle>
                                        <CardDescription>
                                            You’re connected directly with your assigned driver for this booking.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {activeBooking && activeBooking.driver && (
                                            <div className="border rounded-xl p-4 bg-gradient-to-r from-blue-50 to-cyan-50 flex items-center gap-4">
                                                <Avatar className="h-14 w-14 border-2 border-cyan-200">
                                                    <AvatarImage src={activeBooking.driver.avatar_url} alt={activeBooking.driver.name} />
                                                    <AvatarFallback>
                                                        {(activeBooking.driver.name || 'Driver')
                                                            .split(' ')
                                                            .map((n) => n[0])
                                                            .join('')
                                                            .slice(0, 2)
                                                            .toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-semibold text-gray-900">{activeBooking.driver.name}</p>
                                                    <p className="text-sm text-gray-600">
                                                        Age: {activeBooking.driver.age ?? 'N/A'} · {activeBooking.driver.address || 'Address not set'}
                                                    </p>
                                                    <p className="text-sm text-gray-500">Phone: {activeBooking.driver.phone || 'Not provided'}</p>
                                                </div>
                                            </div>
                                        )}

                                        {error && (
                                            <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-md py-2 px-3">
                                                {error}
                                            </div>
                                        )}

                                        <div
                                            ref={messagesRef}
                                            className="h-80 overflow-y-auto rounded-xl border bg-white shadow-inner p-4 space-y-3"
                                        >
                                            {isLoading ? (
                                                <div className="flex items-center justify-center h-full text-gray-500">
                                                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                                                    Loading conversation...
                                                </div>
                                            ) : messages.length === 0 ? (
                                                <p className="text-center text-gray-500 mt-10">
                                                    Send a message to greet your driver and confirm details.
                                                </p>
                                            ) : (
                                                messages.map((message) => {
                                                    const isOwn = message.sender_id === userId;
                                                    const bubbleClasses = message.is_system
                                                        ? 'bg-emerald-50 text-emerald-900'
                                                        : isOwn
                                                            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                                                            : 'bg-gray-100 text-gray-900';

                                                    return (
                                                        <div
                                                            key={message.id}
                                                            className={`flex flex-col ${isOwn ? 'items-end text-right' : 'items-start'}`}
                                                        >
                                                            <div className={`px-4 py-2 rounded-2xl max-w-[85%] shadow-sm ${bubbleClasses}`}>
                                                                {message.message}
                                                            </div>
                                                            <span className="text-[10px] text-gray-500 mt-1">
                                                                {message.sender_name} · {message.created_at ? formatTimestamp(message.created_at) : ''}
                                                            </span>
                                                        </div>
                                                    );
                                                })
                                            )}
                                        </div>

                                        {activeBooking && (
                                            <form className="space-y-2" onSubmit={handleSendMessage}>
                                                <textarea
                                                    rows={3}
                                                    value={newMessage}
                                                    onChange={(event) => setNewMessage(event.target.value)}
                                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                                    placeholder="Send a note to your driver..."
                                                />
                                                <div className="flex justify-end">
                                                    <Button type="submit" disabled={isSending} className="gap-2">
                                                        {isSending ? (
                                                            <>
                                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                                Sending
                                                            </>
                                                        ) : (
                                                            <>
                                                                <MessageSquare className="h-4 w-4" />
                                                                Send Message
                                                            </>
                                                        )}
                                                    </Button>
                                                </div>
                                            </form>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </TropirideLayout>
    );
}

