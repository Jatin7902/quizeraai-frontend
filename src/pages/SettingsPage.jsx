import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import Navbar from '@/components/Navbar';

const SettingsPage = () => {
  const { user, updateUser, deleteAccount } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || '');
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Name cannot be empty.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSaving(true);
    setTimeout(() => {
      const { success } = updateUser({ name });
      if (success) {
        toast({
          title: "Success!",
          description: "Your profile has been updated.",
        });
      } else {
        toast({
          title: "Error",
          description: "Could not update your profile. Please try again.",
          variant: "destructive",
        });
      }
      setIsSaving(false);
    }, 1000);
  };

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      const { success } = deleteAccount();
      if (success) {
        toast({
          title: "Account Deleted",
          description: "Your account has been successfully deleted.",
        });
        navigate('/');
      } else {
        toast({
          title: "Error",
          description: "Could not delete your account. Please try again.",
          variant: "destructive",
        });
      }
      setIsDeleting(false);
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>Settings - QuizEra AI</title>
        <meta name="description" content="Manage your account settings on QuizEra AI." />
      </Helmet>
      <div className="min-h-screen bg-pattern text-white">
        <Navbar />
        <main className="container mx-auto w-full sm:max-w-2xl pt-24 pb-12 px-4">
          <div className="space-y-8">
            <Card className="glass-effect border-white/10 card-hover bg-gray-900/30 w-full mx-auto sm:w-full">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Profile</CardTitle>
                <CardDescription className="text-gray-400">Update your personal information.</CardDescription>
              </CardHeader>
              <form onSubmit={handleSave}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-300">Name</Label>
                    <Input 
                      id="name" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white focus:ring-violet-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">Email</Label>
                    <Input 
                      id="email" 
                      value={user?.email}
                      disabled
                      className="bg-gray-800 border-gray-700 text-white disabled:opacity-50"
                    />
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-900/50 p-6 flex justify-end">
                  <Button type="submit" disabled={isSaving} className="bg-violet-600 hover:bg-violet-700">
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </CardFooter>
              </form>
            </Card>

            <Card className="glass-effect border-red-500/30 card-hover bg-gray-900/30 w-full mx-auto sm:w-full">
              <CardHeader>
                <CardTitle className="text-2xl text-red-400">Delete Account</CardTitle>
                <CardDescription className="text-gray-400">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </CardDescription>
              </CardHeader>
              <CardFooter className="bg-gray-900/50 p-6 flex justify-end">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" disabled={isDeleting}>
                      {isDeleting ? 'Deleting...' : 'Delete My Account'}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-gray-900 border-gray-700 text-white">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription className="text-gray-400">
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-transparent text-white hover:bg-gray-800">Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                        Yes, delete account
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
};

export default SettingsPage;