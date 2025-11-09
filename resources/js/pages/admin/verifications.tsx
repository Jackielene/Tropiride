import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
    CheckCircle, 
    XCircle, 
    Clock, 
    User, 
    Phone, 
    Mail, 
    Home, 
    CreditCard,
    Calendar,
    AlertCircle,
    Eye
} from 'lucide-react';

interface DriverUser {
    id: number;
    name: string;
    email: string;
    phone: string;
    age: number;
    address: string;
    avatar_url: string;
    driver_license_front_url: string;
    driver_license_back_url: string;
    role: string;
    created_at: string;
    updated_at: string;
    verified_at?: string;
    rejection_reason?: string;
}

interface Props {
    pendingUsers: DriverUser[];
    approvedUsers: DriverUser[];
    rejectedUsers: DriverUser[];
    stats: {
        pending: number;
        approved: number;
        rejected: number;
    };
}

export default function Verifications({ pendingUsers, approvedUsers, rejectedUsers, stats }: Props) {
    const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected'>('pending');
    const [selectedUser, setSelectedUser] = useState<DriverUser | null>(null);
    const [showApproveModal, setShowApproveModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [rejectReason, setRejectReason] = useState('');
    const [viewingLicense, setViewingLicense] = useState<{ url: string; title: string } | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleApprove = (userId: number) => {
        setIsProcessing(true);
        router.post(`/admin/verifications/${userId}/approve`, {}, {
            onSuccess: () => {
                setShowApproveModal(false);
                setSelectedUser(null);
            },
            onFinish: () => setIsProcessing(false),
        });
    };

    const handleReject = (userId: number) => {
        if (!rejectReason.trim()) {
            alert('Please provide a rejection reason');
            return;
        }

        setIsProcessing(true);
        router.post(`/admin/verifications/${userId}/reject`, {
            reason: rejectReason
        }, {
            onSuccess: () => {
                setShowRejectModal(false);
                setSelectedUser(null);
                setRejectReason('');
            },
            onFinish: () => setIsProcessing(false),
        });
    };

    const currentUsers = activeTab === 'pending' ? pendingUsers 
        : activeTab === 'approved' ? approvedUsers 
        : rejectedUsers;

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    return (
        <AppLayout>
            <Head title="Driver Verifications - Admin" />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-4 md:p-6">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
                    Driver Verifications
                </h1>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900 border-yellow-300">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Pending</p>
                                    <p className="text-3xl font-bold text-yellow-900 dark:text-yellow-100">{stats.pending}</p>
                                </div>
                                <Clock className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-300">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-green-800 dark:text-green-200">Approved</p>
                                    <p className="text-3xl font-bold text-green-900 dark:text-green-100">{stats.approved}</p>
                                </div>
                                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 border-red-300">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-red-800 dark:text-red-200">Rejected</p>
                                    <p className="text-3xl font-bold text-red-900 dark:text-red-100">{stats.rejected}</p>
                                </div>
                                <XCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Tabs */}
                <div className="border-b border-border">
                    <nav className="-mb-px flex space-x-8">
                        <button
                            onClick={() => setActiveTab('pending')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                                activeTab === 'pending'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                            }`}
                        >
                            Pending ({pendingUsers.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('approved')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                                activeTab === 'approved'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                            }`}
                        >
                            Approved ({approvedUsers.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('rejected')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                                activeTab === 'rejected'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                            }`}
                        >
                            Rejected ({rejectedUsers.length})
                        </button>
                    </nav>
                </div>

                {/* Driver Cards */}
                <div className="grid grid-cols-1 gap-6">
                    {currentUsers.length === 0 ? (
                        <Card>
                            <CardContent className="p-12 text-center">
                                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                                <p className="text-muted-foreground font-medium">No {activeTab} verifications</p>
                                <p className="text-sm text-muted-foreground mt-1">
                                    {activeTab === 'pending' && 'All caught up! No pending verification requests.'}
                                    {activeTab === 'approved' && 'No approved drivers yet.'}
                                    {activeTab === 'rejected' && 'No rejected verifications.'}
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        currentUsers.map(user => (
                            <Card key={user.id} className="shadow-lg">
                                <CardContent className="p-6">
                                    <div className="flex flex-col md:flex-row gap-6">
                                        {/* Avatar */}
                                        <div className="flex-shrink-0">
                                            <Avatar className="h-24 w-24 border-4 border-primary/20">
                                                <AvatarImage src={user.avatar_url} alt={user.name} />
                                                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                                            </Avatar>
                                        </div>

                                        {/* User Info */}
                                        <div className="flex-1 space-y-4">
                                            <div>
                                                <h3 className="text-2xl font-bold">{user.name}</h3>
                                                <p className="text-muted-foreground">Driver Application</p>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                                    <span>{user.email}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                                    <span>{user.phone}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <User className="h-4 w-4 text-muted-foreground" />
                                                    <span>Age: {user.age}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Home className="h-4 w-4 text-muted-foreground" />
                                                    <span>{user.address}</span>
                                                </div>
                                            </div>

                                            {/* License Images */}
                                            <div>
                                                <h4 className="font-semibold mb-3 flex items-center gap-2">
                                                    <CreditCard className="h-4 w-4" />
                                                    Driver's License
                                                </h4>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <p className="text-xs text-muted-foreground mb-2">Front</p>
                                                        <div 
                                                            className="relative group cursor-pointer border-2 rounded-lg overflow-hidden hover:border-primary transition-colors"
                                                            onClick={() => setViewingLicense({ url: user.driver_license_front_url, title: `${user.name} - License Front` })}
                                                        >
                                                            <img 
                                                                src={user.driver_license_front_url}
                                                                alt="License Front"
                                                                className="w-full h-32 object-cover"
                                                            />
                                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                                <Eye className="h-6 w-6 text-white" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-muted-foreground mb-2">Back</p>
                                                        <div 
                                                            className="relative group cursor-pointer border-2 rounded-lg overflow-hidden hover:border-primary transition-colors"
                                                            onClick={() => setViewingLicense({ url: user.driver_license_back_url, title: `${user.name} - License Back` })}
                                                        >
                                                            <img 
                                                                src={user.driver_license_back_url}
                                                                alt="License Back"
                                                                className="w-full h-32 object-cover"
                                                            />
                                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                                <Eye className="h-6 w-6 text-white" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Actions (only for pending) */}
                                            {activeTab === 'pending' && (
                                                <div className="flex gap-3 pt-4">
                                                    <Button
                                                        onClick={() => {
                                                            setSelectedUser(user);
                                                            setShowApproveModal(true);
                                                        }}
                                                        className="bg-green-600 hover:bg-green-700"
                                                    >
                                                        <CheckCircle className="h-4 w-4 mr-2" />
                                                        Approve
                                                    </Button>
                                                    <Button
                                                        onClick={() => {
                                                            setSelectedUser(user);
                                                            setShowRejectModal(true);
                                                        }}
                                                        variant="destructive"
                                                    >
                                                        <XCircle className="h-4 w-4 mr-2" />
                                                        Reject
                                                    </Button>
                                                </div>
                                            )}

                                            {/* Rejection Reason (for rejected tab) */}
                                            {activeTab === 'rejected' && user.rejection_reason && (
                                                <div className="p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
                                                    <p className="text-sm font-semibold text-red-900 dark:text-red-100">Rejection Reason:</p>
                                                    <p className="text-sm text-red-800 dark:text-red-200 mt-1">{user.rejection_reason}</p>
                                                </div>
                                            )}

                                            {/* Approved Date (for approved tab) */}
                                            {activeTab === 'approved' && user.verified_at && (
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <Calendar className="h-4 w-4" />
                                                    <span>Verified on {new Date(user.verified_at).toLocaleDateString()}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>

                {/* Approve Modal */}
                {showApproveModal && selectedUser && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <Card className="max-w-md w-full">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                    Approve Verification
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p>
                                    Are you sure you want to approve <strong>{selectedUser.name}</strong>'s verification? 
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    They will gain full access to accept ride requests immediately.
                                </p>
                                <div className="flex gap-3 justify-end">
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setShowApproveModal(false);
                                            setSelectedUser(null);
                                        }}
                                        disabled={isProcessing}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={() => handleApprove(selectedUser.id)}
                                        className="bg-green-600 hover:bg-green-700"
                                        disabled={isProcessing}
                                    >
                                        {isProcessing ? 'Approving...' : 'Approve'}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Reject Modal */}
                {showRejectModal && selectedUser && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <Card className="max-w-md w-full">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <XCircle className="h-5 w-5 text-red-600" />
                                    Reject Verification
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p>
                                    Provide a reason for rejecting <strong>{selectedUser.name}</strong>'s verification:
                                </p>
                                <textarea
                                    value={rejectReason}
                                    onChange={(e) => setRejectReason(e.target.value)}
                                    className="w-full border rounded-md p-3 min-h-[100px] resize-none"
                                    placeholder="e.g., License image is unclear, please upload a clearer photo..."
                                    required
                                />
                                <div className="flex gap-3 justify-end">
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setShowRejectModal(false);
                                            setSelectedUser(null);
                                            setRejectReason('');
                                        }}
                                        disabled={isProcessing}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={() => handleReject(selectedUser.id)}
                                        variant="destructive"
                                        disabled={isProcessing || !rejectReason.trim()}
                                    >
                                        {isProcessing ? 'Rejecting...' : 'Reject'}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* License Image Viewer Modal */}
                {viewingLicense && (
                    <div 
                        className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
                        onClick={() => setViewingLicense(null)}
                    >
                        <div className="max-w-6xl max-h-screen flex flex-col">
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-white font-semibold">{viewingLicense.title}</h3>
                                <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => setViewingLicense(null)}
                                    className="bg-white"
                                >
                                    Close
                                </Button>
                            </div>
                            <img 
                                src={viewingLicense.url}
                                alt={viewingLicense.title}
                                className="max-w-full max-h-[85vh] object-contain rounded-lg"
                            />
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

