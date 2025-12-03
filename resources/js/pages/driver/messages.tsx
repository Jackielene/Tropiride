import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageSquare, Loader2, MapPin, Phone } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { SharedData } from '@/types';
import api from '@/lib/axios';

interface DriverCustomer {
    id: number;
    name: string;
    phone?: string;
    avatar_url?: string;
}

interface DriverConversation {
    chat_booking_id: number;
    latest_booking_id: number;
    pickup_location: string;
    dropoff_location: string;
    status: string;
    vehicle_type?: string;
    passengers?: number;
    customer?: DriverCustomer | null;
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

interface DriverMessagesProps {
    bookings: DriverConversation[];
    initialBookingId: number | null;
}

export default function DriverMessages({ bookings = [], initialBookingId }: DriverMessagesProps) {
    const { auth } = usePage<SharedData>().props;
    const driver = auth.user;

    const [activeBookingId, setActiveBookingId] = useState<number | null>(
        initialBookingId ?? (bookings[0]?.chat_booking_id ?? null),
    );
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const messagesRef = useRef<HTMLDivElement | null>(null);
    

    const activeBooking = useMemo(() => {
        if (!activeBookingId) return null;
        return bookings.find((booking) => booking.chat_booking_id === activeBookingId) ?? null;
    }, [bookings, activeBookingId]);

    useEffect(() => {
        if (!activeBookingId) {
            setMessages([]);
            return;
        }

        let isCurrent = true;

        const loadMessages = async (silent = false) => {
            if (!silent) {
                setIsLoading(true);
                setError(null);
            }

            try {
                const response = await api.get(`/chat/bookings/${activeBookingId}/messages`);
                if (!isCurrent) return;
                setMessages(response.data.messages ?? []);
            } catch (err) {
                console.error(err);
                if (!isCurrent) return;
                if (!silent) {
                    setError('Unable to load messages. Please try again.');
                }
            } finally {
                if (isCurrent && !silent) {
                    setIsLoading(false);
                }
            }
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
            const response = await api.post(`/chat/bookings/${activeBookingId}/messages`, {
                message: trimmed,
            });

            if (response.data.message) {
                setMessages((prev) => [...prev, response.data.message]);
            }
            setNewMessage('');
        } catch (err) {
            console.error(err);
            setError('Unable to send message. Please try again.');
        } finally {
            setIsSending(false);
        }
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

    const formatTimestamp = (isoString: string) => {
        return new Date(isoString).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getInitials = (name: string | undefined) => {
        if (!name) return 'CU';
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .slice(0, 2)
            .toUpperCase();
    };

    return (
        <AppLayout>
            <Head title="Messages - Driver" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-hidden p-4 md:p-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
                    <p className="text-muted-foreground">
                        Keep your customers updated and confirm trip details in real time.
                    </p>
                </div>

                {bookings.length === 0 ? (
                    <Card className="border-dashed">
                        <CardContent className="py-16 text-center space-y-3">
                            <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground" />
                            <p className="text-lg font-semibold">No conversations yet</p>
                            <p className="text-sm text-muted-foreground">
                                Accept a booking to start chatting with customers.
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-6 lg:grid-cols-3">
                        <div className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Your Rides</CardTitle>
                                    <CardDescription>Select a booking to open its chat thread</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <Select
                                        value={activeBookingId ? String(activeBookingId) : undefined}
                                        onValueChange={(value) => setActiveBookingId(Number(value))}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Choose booking" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {bookings.map((booking) => (
                                                <SelectItem
                                                    key={booking.chat_booking_id}
                                                    value={String(booking.chat_booking_id)}
                                                >
                                                    #{booking.latest_booking_id} · {booking.customer?.name || 'Customer'}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                                        {bookings.map((booking) => {
                                            const isActive = activeBookingId === booking.chat_booking_id;
                                            return (
                                                <button
                                                    key={booking.chat_booking_id}
                                                    onClick={() => setActiveBookingId(booking.chat_booking_id)}
                                                    className={`w-full text-left border rounded-xl p-4 transition ${
                                                        isActive
                                                            ? 'border-primary shadow-lg shadow-primary/10 bg-primary/5'
                                                            : 'border-border bg-background hover:border-primary/50'
                                                    }`}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <p className="font-semibold text-sm">
                                                            #{booking.latest_booking_id} · {booking.customer?.name || 'Customer'}
                                                        </p>
                                                        <Badge
                                                            variant={getStatusBadgeVariant(booking.status)}
                                                            className="text-[10px]"
                                                        >
                                                            {booking.status.replace('_', ' ')}
                                                        </Badge>
                                                    </div>
                                                    <p className="mt-1 text-xs text-muted-foreground flex items-center gap-1">
                                                        <MapPin className="h-3 w-3" />
                                                        {booking.pickup_location}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground ml-4 truncate">
                                                        {booking.dropoff_location}
                                                    </p>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="lg:col-span-2">
                            <Card className="h-full">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <MessageSquare className="h-5 w-5 text-primary" />
                                        Conversation
                                    </CardTitle>
                                    <CardDescription>
                                        Respond quickly to provide a smoother pickup experience.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {activeBooking && (
                                        <div className="rounded-xl border p-4 bg-muted/40 flex items-center gap-4">
                                            <Avatar className="h-12 w-12 border">
                                                <AvatarImage
                                                    src={
                                                        activeBooking.customer?.avatar_url ??
                                                        (activeBooking.customer?.name
                                                            ? `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                                  activeBooking.customer.name,
                                                              )}&background=0ea5e9&color=fff`
                                                            : undefined)
                                                    }
                                                />
                                                <AvatarFallback>
                                                    {getInitials(activeBooking.customer?.name || 'Customer')}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="space-y-1">
                                                <p className="font-semibold">
                                                    {activeBooking.customer?.name || 'Customer'}
                                                </p>
                                                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                                                    <span className="flex items-center gap-1">
                                                        <Phone className="h-3 w-3" />
                                                        {activeBooking.customer?.phone || 'No phone'}
                                                    </span>
                                                    {activeBooking.vehicle_type && (
                                                        <Badge variant="outline" className="capitalize">
                                                            {activeBooking.vehicle_type}
                                                        </Badge>
                                                    )}
                                                    {activeBooking.passengers && (
                                                        <span>{activeBooking.passengers} pax</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {error && (
                                        <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                                            {error}
                                        </div>
                                    )}

                                    <div
                                        ref={messagesRef}
                                        className="h-96 rounded-xl border bg-background p-4 overflow-y-auto space-y-3"
                                    >
                                        {isLoading ? (
                                            <div className="flex h-full items-center justify-center text-muted-foreground">
                                                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                                                Loading conversation...
                                            </div>
                                        ) : messages.length === 0 ? (
                                            <div className="text-center text-muted-foreground mt-10">
                                                Start the conversation and let the customer know you’re on the way.
                                            </div>
                                        ) : (
                                            messages.map((message) => {
                                                const isOwn = message.sender_id === driver.id;
                                                const bubbleClasses = message.is_system
                                                    ? 'bg-amber-100 text-amber-900'
                                                    : isOwn
                                                        ? 'bg-primary text-primary-foreground'
                                                        : 'bg-muted text-foreground';

                                                return (
                                                    <div
                                                        key={message.id}
                                                        className={`flex flex-col ${
                                                            isOwn ? 'items-end text-right' : 'items-start'
                                                        }`}
                                                    >
                                                        <div className={`px-4 py-2 rounded-2xl max-w-[80%] ${bubbleClasses}`}>
                                                            {message.message}
                                                        </div>
                                                        <span className="mt-1 text-[10px] text-muted-foreground">
                                                            {message.sender_name} ·{' '}
                                                            {message.created_at ? formatTimestamp(message.created_at) : ''}
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
                                                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                                placeholder="Send a quick update..."
                                            />
                                            <div className="flex justify-end">
                                                <Button type="submit" disabled={isSending}>
                                                    {isSending ? (
                                                        <>
                                                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                                            Sending
                                                        </>
                                                    ) : (
                                                        'Send Message'
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
        </AppLayout>
    );
}

