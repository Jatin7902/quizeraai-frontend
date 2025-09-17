import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Users, 
  FileText, 
  BarChart3, 
  Settings, 
  Search,
  Filter,
  Download,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  Upload,
  MessageSquare,
  Shield,
  Database,
  Activity,
  PieChart,
  Calendar,
  Clock,
  Mail,
  Phone,
  Star,
  Edit,
  Save,
  RefreshCw
} from 'lucide-react';

const AdminPanel = () => {
  const { toast } = useToast();
  const { user, token } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [analytics, setAnalytics] = useState(null);
  const [userActivity, setUserActivity] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // API Base URL
  const API_BASE = 'https://quizera-ai-backend.vercel.app';

  // Fetch analytics data
  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/api/admin/analytics`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch analytics');
      }
      
      const data = await response.json();
      setAnalytics(data.analytics);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      toast({
        title: "Error",
        description: "Failed to fetch analytics data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch user activity data
  const fetchUserActivity = async (page = 1, search = '', status = 'all') => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '50',
        search,
        status
      });
      
      const response = await fetch(`${API_BASE}/api/admin/user-activity?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch user activity');
      }
      
      const data = await response.json();
      setUserActivity(data);
    } catch (error) {
      console.error('Error fetching user activity:', error);
      toast({
        title: "Error",
        description: "Failed to fetch user activity data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    if (token) {
      fetchAnalytics();
      fetchUserActivity();
    }
  }, [token]);

  // Load data when tab changes
  useEffect(() => {
    if (token && activeTab === 'users') {
      fetchUserActivity(currentPage, searchTerm, filterStatus);
    }
  }, [activeTab, currentPage, searchTerm, filterStatus, token]);

  // Mock data - in real app, this would come from API
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      status: 'active',
      credits: 4,
      createdAt: '2024-01-15',
      lastLogin: '2024-01-20',
      uploads: 5,
      quizzes: 3
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      status: 'inactive',
      credits: 2,
      createdAt: '2024-01-10',
      lastLogin: '2024-01-18',
      uploads: 2,
      quizzes: 1
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      status: 'active',
      credits: 8,
      createdAt: '2024-01-12',
      lastLogin: '2024-01-21',
      uploads: 8,
      quizzes: 6
    }
  ]);

  const [uploads, setUploads] = useState([
    {
      id: 1,
      userEmail: 'john@example.com',
      fileName: 'math-chapter1.pdf',
      fileType: 'PDF',
      fileSize: '2.5 MB',
      uploadedAt: '2024-01-20',
      status: 'processed'
    },
    {
      id: 2,
      userEmail: 'jane@example.com',
      fileName: 'science-diagram.png',
      fileType: 'Image',
      fileSize: '1.2 MB',
      uploadedAt: '2024-01-19',
      status: 'pending'
    }
  ]);

  const [quizzes, setQuizzes] = useState([
    {
      id: 1,
      userEmail: 'john@example.com',
      title: 'Math Quiz - Chapter 1',
      type: 'Quiz',
      difficulty: 'Medium',
      questions: 10,
      createdAt: '2024-01-20',
      status: 'completed'
    },
    {
      id: 2,
      userEmail: 'mike@example.com',
      title: 'Science Test Paper',
      type: 'Test Paper',
      difficulty: 'Hard',
      questions: 25,
      createdAt: '2024-01-21',
      status: 'completed'
    }
  ]);

  const [feedback, setFeedback] = useState([
    {
      id: 1,
      userEmail: 'john@example.com',
      subject: 'Great platform!',
      message: 'Love the quiz generation feature',
      status: 'resolved',
      createdAt: '2024-01-20'
    },
    {
      id: 2,
      userEmail: 'jane@example.com',
      subject: 'Need help with upload',
      message: 'Having trouble uploading PDF files',
      status: 'pending',
      createdAt: '2024-01-19'
    }
  ]);

  // Use real analytics data or fallback to mock data
  const analyticsData = analytics || {
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    dailyActiveUsers: 0,
    weeklyActiveUsers: 0,
    monthlyActiveUsers: 0,
    totalUploads: 0,
    totalQuizzes: 0,
    monthlyRevenue: 0,
    userTrends: [],
    creditsStats: {
      totalCredits: 0,
      avgCredits: 0,
      minCredits: 0,
      maxCredits: 0
    }
  };

  const handleUserAction = (userId, action) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: action === 'activate' ? 'active' : 'inactive' }
        : user
    ));
    
    toast({
      title: "User Updated",
      description: `User has been ${action === 'activate' ? 'activated' : 'deactivated'}`,
    });
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
    toast({
      title: "User Deleted",
      description: "User has been permanently deleted",
      variant: "destructive",
    });
  };

  const handleDeleteUpload = (uploadId) => {
    setUploads(uploads.filter(upload => upload.id !== uploadId));
    toast({
      title: "Upload Deleted",
      description: "Upload has been permanently deleted",
      variant: "destructive",
    });
  };

  const handleFeedbackAction = (feedbackId, action) => {
    setFeedback(feedback.map(f => 
      f.id === feedbackId 
        ? { ...f, status: action }
        : f
    ));
    
    toast({
      title: "Feedback Updated",
      description: `Feedback marked as ${action}`,
    });
  };

  // Use real user data or fallback to mock data
  const displayUsers = userActivity?.users || users;
  const filteredUsers = displayUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || (user.isVerified ? 'active' : 'inactive') === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-effect border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Total Users</p>
                <p className="text-3xl font-bold text-white">{analyticsData.totalUsers}</p>
              </div>
              <Users className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Active Users</p>
                <p className="text-3xl font-bold text-white">{analyticsData.activeUsers}</p>
              </div>
              <Activity className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">New This Week</p>
                <p className="text-3xl font-bold text-white">{analyticsData.weeklyActiveUsers}</p>
              </div>
              <Upload className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Total Credits</p>
                <p className="text-3xl font-bold text-white">{analyticsData.creditsStats.totalCredits}</p>
              </div>
              <FileText className="w-8 h-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-effect border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              User Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              {analyticsData.userTrends && analyticsData.userTrends.length > 0 ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-7 gap-2">
                    {analyticsData.userTrends.map((day, index) => (
                      <div key={index} className="text-center">
                        <div className="text-xs text-white/60 mb-1">
                          {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                        </div>
                        <div className="bg-blue-500/20 rounded h-16 flex items-end justify-center">
                          <div 
                            className="bg-blue-500 rounded-t w-full transition-all duration-300"
                            style={{ height: `${Math.max((day.count / Math.max(...analyticsData.userTrends.map(d => d.count))) * 100, 5)}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-white mt-1">{day.count}</div>
                      </div>
                    ))}
                  </div>
                  <div className="text-center text-white/60 text-sm">
                    User registrations over the last 7 days
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-white/60">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No data available</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <PieChart className="w-5 h-5 mr-2" />
              Content Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-white/60">
              <div className="text-center">
                <PieChart className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Pie chart will be implemented here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderUserManagement = () => (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full md:w-48 bg-white/10 border-white/20 text-white">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Users</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Users Table */}
      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <span>User Management</span>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-white/20 text-white hover:bg-white/10"
                onClick={() => fetchUserActivity(currentPage, searchTerm, filterStatus)}
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-white/60 py-3 px-4">User</th>
                  <th className="text-left text-white/60 py-3 px-4">Status</th>
                  <th className="text-left text-white/60 py-3 px-4">Credits</th>
                  <th className="text-left text-white/60 py-3 px-4">Uploads</th>
                  <th className="text-left text-white/60 py-3 px-4">Last Login</th>
                  <th className="text-left text-white/60 py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user._id || user.id} className="border-b border-white/5">
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-white font-medium">{user.name}</p>
                        <p className="text-white/60 text-sm">{user.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        user.isVerified 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {user.isVerified ? (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        ) : (
                          <XCircle className="w-3 h-3 mr-1" />
                        )}
                        {user.isVerified ? 'active' : 'inactive'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-white">{user.credits || 0}</td>
                    <td className="py-3 px-4 text-white">{user.uploads || 0}</td>
                    <td className="py-3 px-4 text-white/60 text-sm">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleUserAction(user.id, user.status === 'active' ? 'deactivate' : 'activate')}
                          className="text-white/60 hover:text-white hover:bg-white/10"
                        >
                          {user.status === 'active' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {userActivity?.pagination && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
              <div className="text-white/60 text-sm">
                Showing {((userActivity.pagination.currentPage - 1) * userActivity.pagination.limit) + 1} to{' '}
                {Math.min(userActivity.pagination.currentPage * userActivity.pagination.limit, userActivity.pagination.totalUsers)} of{' '}
                {userActivity.pagination.totalUsers} users
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-white hover:bg-white/10"
                  onClick={() => {
                    setCurrentPage(prev => Math.max(prev - 1, 1));
                  }}
                  disabled={userActivity.pagination.currentPage <= 1 || loading}
                >
                  Previous
                </Button>
                <span className="px-3 py-1 text-white/60 text-sm">
                  Page {userActivity.pagination.currentPage} of {userActivity.pagination.totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-white hover:bg-white/10"
                  onClick={() => {
                    setCurrentPage(prev => Math.min(prev + 1, userActivity.pagination.totalPages));
                  }}
                  disabled={userActivity.pagination.currentPage >= userActivity.pagination.totalPages || loading}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderUploadsMonitoring = () => (
    <div className="space-y-6">
      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Upload className="w-5 h-5 mr-2" />
            Uploads Monitoring
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-white/60 py-3 px-4">File</th>
                  <th className="text-left text-white/60 py-3 px-4">User</th>
                  <th className="text-left text-white/60 py-3 px-4">Type</th>
                  <th className="text-left text-white/60 py-3 px-4">Size</th>
                  <th className="text-left text-white/60 py-3 px-4">Status</th>
                  <th className="text-left text-white/60 py-3 px-4">Uploaded</th>
                  <th className="text-left text-white/60 py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {uploads.map((upload) => (
                  <tr key={upload.id} className="border-b border-white/5">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 text-blue-400 mr-2" />
                        <span className="text-white">{upload.fileName}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-white/60 text-sm">{upload.userEmail}</td>
                    <td className="py-3 px-4 text-white">{upload.fileType}</td>
                    <td className="py-3 px-4 text-white/60">{upload.fileSize}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        upload.status === 'processed' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {upload.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-white/60 text-sm">{upload.uploadedAt}</td>
                    <td className="py-3 px-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteUpload(upload.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContentManagement = () => (
    <div className="space-y-6">
      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Quiz & Content Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-white/60 py-3 px-4">Title</th>
                  <th className="text-left text-white/60 py-3 px-4">User</th>
                  <th className="text-left text-white/60 py-3 px-4">Type</th>
                  <th className="text-left text-white/60 py-3 px-4">Difficulty</th>
                  <th className="text-left text-white/60 py-3 px-4">Questions</th>
                  <th className="text-left text-white/60 py-3 px-4">Status</th>
                  <th className="text-left text-white/60 py-3 px-4">Created</th>
                </tr>
              </thead>
              <tbody>
                {quizzes.map((quiz) => (
                  <tr key={quiz.id} className="border-b border-white/5">
                    <td className="py-3 px-4 text-white font-medium">{quiz.title}</td>
                    <td className="py-3 px-4 text-white/60 text-sm">{quiz.userEmail}</td>
                    <td className="py-3 px-4 text-white">{quiz.type}</td>
                    <td className="py-3 px-4 text-white">{quiz.difficulty}</td>
                    <td className="py-3 px-4 text-white">{quiz.questions}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {quiz.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-white/60 text-sm">{quiz.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderFeedbackSupport = () => (
    <div className="space-y-6">
      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <MessageSquare className="w-5 h-5 mr-2" />
            Feedback & Support
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {feedback.map((item) => (
              <div key={item.id} className="border border-white/10 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="text-white font-medium">{item.subject}</h4>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        item.status === 'resolved' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <p className="text-white/60 text-sm mb-2">{item.message}</p>
                    <div className="flex items-center space-x-4 text-xs text-white/50">
                      <span>From: {item.userEmail}</span>
                      <span>{item.createdAt}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {item.status === 'pending' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleFeedbackAction(item.id, 'resolved')}
                        className="text-green-400 hover:text-green-300 hover:bg-green-500/10"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Resolve
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white/60 hover:text-white hover:bg-white/10"
                    >
                      <Mail className="w-4 h-4 mr-1" />
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAdminSettings = () => (
    <div className="space-y-6">
      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            Admin Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-white mb-2 block">Change Password</Label>
            <div className="space-y-4">
              <Input
                type="password"
                placeholder="Current Password"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Input
                type="password"
                placeholder="New Password"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Input
                type="password"
                placeholder="Confirm New Password"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                <Save className="w-4 h-4 mr-2" />
                Update Password
              </Button>
            </div>
          </div>

          <div>
            <Label className="text-white mb-2 block">System Information</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-white/60 text-sm">Database Status</p>
                <p className="text-green-400 font-medium">Connected</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-white/60 text-sm">Server Uptime</p>
                <p className="text-white font-medium">99.9%</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-white/60 text-sm">Storage Used</p>
                <p className="text-white font-medium">2.5 GB / 10 GB</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-white/60 text-sm">Last Backup</p>
                <p className="text-white font-medium">2 hours ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Admin Panel - QuizEra AI</title>
        <meta name="description" content="Admin panel for managing QuizEra AI platform" />
      </Helmet>

      <div className="min-h-screen bg-pattern">
        <Navbar />
        
        <div className="pt-24 pb-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Admin Panel
              </h1>
              <p className="text-white/70 text-lg">
                Manage your QuizEra AI platform
              </p>
            </motion.div>

            {/* Admin Tabs */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
                  { id: 'users', label: 'User Management', icon: Users },
                  { id: 'uploads', label: 'Uploads', icon: Upload },
                  { id: 'content', label: 'Content', icon: FileText },
                  { id: 'feedback', label: 'Feedback', icon: MessageSquare },
                  { id: 'settings', label: 'Settings', icon: Settings }
                ].map((tab) => (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? 'default' : 'outline'}
                    onClick={() => setActiveTab(tab.id)}
                    className={`${
                      activeTab === tab.id 
                        ? 'bg-white text-purple-600' 
                        : 'border-white/20 text-white hover:bg-white/10'
                    }`}
                  >
                    <tab.icon className="w-4 h-4 mr-2" />
                    {tab.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'dashboard' && renderDashboard()}
              {activeTab === 'users' && renderUserManagement()}
              {activeTab === 'uploads' && renderUploadsMonitoring()}
              {activeTab === 'content' && renderContentManagement()}
              {activeTab === 'feedback' && renderFeedbackSupport()}
              {activeTab === 'settings' && renderAdminSettings()}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;


