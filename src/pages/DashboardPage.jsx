
import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import { 
  Upload, 
  FileText, 
  Image, 
  Type, 
  Zap, 
  Clock,
  FileQuestion,
  BookOpen,
  X,
  CheckCircle,
  AlertCircle,
  Download
} from 'lucide-react';

const DashboardPage = () => {
  const { user, updateCredits } = useAuth();
  const { toast } = useToast();
  
  // Get API base URL from environment or use default
  const getApiBaseUrl = () => {
    if (import.meta.env.VITE_API_URL) {
      return import.meta.env.VITE_API_URL;
    }
    const hostname = window.location.hostname;
    if (hostname.includes('vercel.app')) {
      return 'https://quizera-ai-backend.vercel.app/api';
    }
    return 'http://localhost:5000/api';
  };
  
  const API_BASE_URL = getApiBaseUrl();
  
  // Debug logging
  console.log('DashboardPage API_BASE_URL:', API_BASE_URL);
  
  const fileInputRef = useRef(null);
  const [uploadType, setUploadType] = useState('pdf');
  const [outputType, setOutputType] = useState('');
  const [language, setLanguage] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [textContent, setTextContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [uploadError, setUploadError] = useState('');
  const [generatedQuiz, setGeneratedQuiz] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);

  // File validation function
  const validateFile = (file) => {
    const maxSize = uploadType === 'pdf' ? 10 * 1024 * 1024 : 5 * 1024 * 1024; // 10MB for PDF, 5MB for images
    const allowedTypes = uploadType === 'pdf' 
      ? ['application/pdf'] 
      : ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    
    if (file.size > maxSize) {
      return `File size must be less than ${uploadType === 'pdf' ? '10MB' : '5MB'}`;
    }
    
    if (!allowedTypes.includes(file.type)) {
      return uploadType === 'pdf' 
        ? 'Only PDF files are allowed' 
        : 'Only JPG, PNG, and WebP images are allowed';
    }
    
    return null;
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploadError('');
    
    const error = validateFile(file);
    if (error) {
      setUploadError(error);
      toast({
        title: "Invalid File",
        description: error,
        variant: "destructive",
      });
      return;
    }

    setUploadedFile(file);
    
    // Create preview for images
    if (uploadType === 'image') {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFilePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFilePreview(null);
    }

    toast({
      title: "File Uploaded Successfully",
      description: `${file.name} has been uploaded successfully.`,
    });
  };

  // Handle drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const event = { target: { files: [file] } };
      handleFileUpload(event);
    }
  };

  // Remove uploaded file
  const removeFile = () => {
    setUploadedFile(null);
    setFilePreview(null);
    setUploadError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Reset form when upload type changes
  const handleUploadTypeChange = (type) => {
    setUploadType(type);
    removeFile();
    setTextContent('');
  };

  const handleGenerate = async () => {
    if (!outputType || !language || !difficulty) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields before generating.",
        variant: "destructive",
      });
      return;
    }

    if (uploadType === 'text' && !textContent.trim()) {
      toast({
        title: "No Content",
        description: "Please enter some text content to generate from.",
        variant: "destructive",
      });
      return;
    }

    if ((uploadType === 'pdf' || uploadType === 'image') && !uploadedFile) {
      toast({
        title: "No File Uploaded",
        description: `Please upload a ${uploadType.toUpperCase()} file to generate from.`,
        variant: "destructive",
      });
      return;
    }

    if (user.credits <= 0) {
      toast({
        title: "No Credits Remaining",
        description: "You need AI credits to generate content. Please upgrade your plan.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      console.log('Starting quiz generation...');
      console.log('Upload type:', uploadType);
      console.log('Output type:', outputType);
      console.log('Language:', language);
      console.log('Difficulty:', difficulty);
      
      let response;
      
      if (uploadType === 'pdf') {
        console.log('Generating from PDF:', uploadedFile?.name);
        console.log('Auth token:', localStorage.getItem('quizera_token') ? 'Present' : 'Missing');
        
        // Generate quiz from PDF
        const formData = new FormData();
        formData.append('pdf', uploadedFile);
        formData.append('numQuestions', '10');
        formData.append('language', language);
        formData.append('difficulty', difficulty);
        formData.append('outputType', outputType);

        const token = localStorage.getItem('quizera_token');
        if (!token) {
          throw new Error('No authentication token found. Please login again.');
        }

        response = await fetch(`${API_BASE_URL}/quiz/generate`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });
      } else if (uploadType === 'text') {
        console.log('Generating from text content');
        // Generate quiz from text
        response = await fetch(`${API_BASE_URL}/quiz/generate-text`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('quizera_token')}`
          },
          body: JSON.stringify({
            text: textContent,
            numQuestions: 10,
            language,
            difficulty,
            outputType
          })
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);

      if (data.success) {
        setGeneratedQuiz(data.quiz);
        setShowQuiz(true);
        updateCredits(data.creditsRemaining);
        
        toast({
          title: "Quiz Generated Successfully!",
          description: `${data.quiz.totalQuestions} questions generated. 1 credit used.`,
        });
      } else {
        toast({
          title: "Generation Failed",
          description: data.error || "Failed to generate quiz",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Generation error:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate quiz. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const history = JSON.parse(localStorage.getItem('quizera_history') || '[]');

  const renderQuiz = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Generated {generatedQuiz?.outputType}
            </h2>
            <Button
              onClick={() => setShowQuiz(false)}
              variant="ghost"
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="mb-4 text-sm text-gray-600">
            <p><strong>Language:</strong> {generatedQuiz?.language}</p>
            <p><strong>Difficulty:</strong> {generatedQuiz?.difficulty}</p>
            <p><strong>Total Questions:</strong> {generatedQuiz?.totalQuestions}</p>
          </div>

          <div className="space-y-6">
            {generatedQuiz?.questions?.map((question, index) => (
              <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Q{index + 1}. {question.question}
                </h3>
                
                <div className="space-y-2">
                  {question.options.map((option, optIndex) => (
                    <div key={optIndex} className="flex items-center space-x-2">
                      <span className="text-gray-600 font-medium">{option}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-3 p-2 bg-green-50 rounded border-l-4 border-green-400">
                  <span className="text-green-800 font-medium">
                    Answer: {question.answer}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <Button
              onClick={() => setShowQuiz(false)}
              variant="outline"
            >
              Close
            </Button>
            <Button
              onClick={() => {
                // TODO: Add download functionality
                toast({
                  title: "Download Feature",
                  description: "Download functionality will be added soon!",
                });
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Dashboard - QuizEra AI</title>
        <meta name="description" content="Generate AI-powered quizzes, test papers, and important questions from your uploaded content. Manage your AI credits and view your generation history." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:bg-pattern">
        <Navbar />
        
        <div className="pt-24 pb-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8"> {/* Added px for mobile, sm:px for small screens */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Welcome, {user?.name}!
              </h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-white/10 rounded-lg px-4 py-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <span className="text-white font-medium">Your AI Credits: {user?.credits}</span>
                </div>
              </div>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8"> {/* Removed px-4 sm:px-0 here */}
              {/* Main Generation Panel */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <Card className="glass-effect border-white/20 w-full"> {/* Removed sm:w-full for full width */}
                    <CardHeader>
                      <CardTitle className="text-2xl text-white flex items-center">
                        <Upload className="w-6 h-6 mr-2" />
                        Generate AI Content
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Upload Section */}
                      <div>
                        <Label className="text-white text-lg mb-4 block">Upload Your Content:</Label>
                        <div className="grid grid-cols-3 gap-4">
                          <Button
                            variant={uploadType === 'pdf' ? 'default' : 'outline'}
                            onClick={() => handleUploadTypeChange('pdf')}
                            className={`h-20 flex flex-col items-center justify-center ${
                              uploadType === 'pdf' 
                                ? 'bg-white text-purple-600' 
                                : 'border-white/20 text-white hover:bg-white/10'
                            }`}
                          >
                            <FileText className="w-6 h-6 mb-1" />
                            PDF
                          </Button>
                          <Button
                            variant={uploadType === 'image' ? 'default' : 'outline'}
                            onClick={() => handleUploadTypeChange('image')}
                            className={`h-20 flex flex-col items-center justify-center ${
                              uploadType === 'image' 
                                ? 'bg-white text-purple-600' 
                                : 'border-white/20 text-white hover:bg-white/10'
                            }`}
                          >
                            <Image className="w-6 h-6 mb-1" />
                            Image
                          </Button>
                          <Button
                            variant={uploadType === 'text' ? 'default' : 'outline'}
                            onClick={() => handleUploadTypeChange('text')}
                            className={`h-20 flex flex-col items-center justify-center ${
                              uploadType === 'text' 
                                ? 'bg-white text-purple-600' 
                                : 'border-white/20 text-white hover:bg-white/10'
                            }`}
                          >
                            <Type className="w-6 h-6 mb-1" />
                            Type Text
                          </Button>
                        </div>
                      </div>

                      {/* Text Input for Type Text option */}
                      {uploadType === 'text' && (
                        <div>
                          <Label className="text-white">Enter your text content:</Label>
                          <Textarea
                            value={textContent}
                            onChange={(e) => setTextContent(e.target.value)}
                            placeholder="Paste or type your chapter content here..."
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[150px]"
                          />
                        </div>
                      )}

                      {/* File Upload for PDF/Image */}
                      {(uploadType === 'pdf' || uploadType === 'image') && (
                        <div>
                          {!uploadedFile ? (
                            <div 
                              className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-white/40 transition-colors cursor-pointer"
                              onDragOver={handleDragOver}
                              onDrop={handleDrop}
                              onClick={() => fileInputRef.current?.click()}
                            >
                              <Upload className="w-12 h-12 text-white/50 mx-auto mb-4" />
                              <p className="text-white/70 mb-2">
                                Click to upload or drag and drop your {uploadType.toUpperCase()}
                              </p>
                              <p className="text-white/50 text-sm mb-4">
                                {uploadType === 'pdf' ? 'PDF files up to 10MB' : 'JPG, PNG, WebP files up to 5MB'}
                              </p>
                              <Button 
                                variant="outline" 
                                className="border-white/20 text-white hover:bg-white/10"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  fileInputRef.current?.click();
                                }}
                              >
                                Choose File
                              </Button>
                              <input
                                ref={fileInputRef}
                                type="file"
                                accept={uploadType === 'pdf' ? '.pdf' : '.jpg,.jpeg,.png,.webp'}
                                onChange={handleFileUpload}
                                className="hidden"
                              />
                            </div>
                          ) : (
                            <div className="border border-white/20 rounded-lg p-4 bg-white/5">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  {uploadType === 'pdf' ? (
                                    <FileText className="w-8 h-8 text-red-400" />
                                  ) : (
                                    <Image className="w-8 h-8 text-blue-400" />
                                  )}
                                  <div>
                                    <p className="text-white font-medium">{uploadedFile.name}</p>
                                    <p className="text-white/60 text-sm">
                                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <CheckCircle className="w-5 h-5 text-green-400" />
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={removeFile}
                                    className="text-white/60 hover:text-white hover:bg-white/10"
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                              
                              {/* Image Preview */}
                              {filePreview && (
                                <div className="mt-4">
                                  <img
                                    src={filePreview}
                                    alt="Preview"
                                    className="max-w-full h-48 object-contain rounded-lg border border-white/10"
                                  />
                                </div>
                              )}
                            </div>
                          )}
                          
                          {/* Error Message */}
                          {uploadError && (
                            <div className="mt-2 flex items-center space-x-2 text-red-400 text-sm">
                              <AlertCircle className="w-4 h-4" />
                              <span>{uploadError}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Output Type Selection */}
                      <div>
                        <Label className="text-white text-lg mb-4 block">Choose Output:</Label>
                        <div className="grid grid-cols-3 gap-4">
                          <Button
                            variant={outputType === 'Quiz' ? 'default' : 'outline'}
                            onClick={() => setOutputType('Quiz')}
                            className={`h-20 flex flex-col items-center justify-center ${
                              outputType === 'Quiz' 
                                ? 'bg-white text-purple-600' 
                                : 'border-white/20 text-white hover:bg-white/10'
                            }`}
                          >
                            <FileQuestion className="w-5 h-5 mb-1" />
                            Quiz
                          </Button>
                          <Button
                            variant={outputType === 'Test Paper' ? 'default' : 'outline'}
                            onClick={() => setOutputType('Test Paper')}
                            className={`h-20 flex flex-col items-center justify-center ${
                              outputType === 'Test Paper' 
                                ? 'bg-white text-purple-600' 
                                : 'border-white/20 text-white hover:bg-white/10'
                            }`}
                          >
                            <FileText className="w-5 h-5 mb-1" />
                            Test Paper
                          </Button>
                          <Button
                            variant={outputType === 'Important Questions' ? 'default' : 'outline'}
                            onClick={() => setOutputType('Important Questions')}
                            className={`h-20 flex flex-col items-center justify-center ${
                              outputType === 'Important Questions' 
                                ? 'bg-white text-purple-600' 
                                : 'border-white/20 text-white hover:bg-white/10'
                            }`}
                          >
                            <BookOpen className="w-5 h-5 mb-1" />
                            Important Questions
                          </Button>
                        </div>
                      </div>

                      {/* Language and Difficulty */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-white mb-2 block">Choose Language:</Label>
                          <Select value={language} onValueChange={setLanguage}>
                            <SelectTrigger className="bg-white/10 border-white/20 text-white">
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="English">English</SelectItem>
                              <SelectItem value="Hindi">हिंदी (Hindi)</SelectItem>
                              <SelectItem value="Spanish">Español (Spanish)</SelectItem>
                              <SelectItem value="French">Français (French)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label className="text-white mb-2 block">Select Difficulty:</Label>
                          <Select value={difficulty} onValueChange={setDifficulty}>
                            <SelectTrigger className="bg-white/10 border-white/20 text-white">
                              <SelectValue placeholder="Select difficulty" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Easy">Easy (आसान)</SelectItem>
                              <SelectItem value="Medium">Medium (मध्यम)</SelectItem>
                              <SelectItem value="Hard">Hard (कठिन)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Generate Button */}
                      <Button 
                        onClick={handleGenerate}
                        disabled={loading || user.credits <= 0}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-lg py-6 h-auto"
                      >
                        {loading ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Generating...
                          </>
                        ) : (
                          <>
                            <Zap className="w-5 h-5 mr-2" />
                            Generate Now
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* History Sidebar */}
              <div>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <Card className="glass-effect border-white/20 w-full"> {/* Removed sm:w-full for full width */}
                    <CardHeader>
                      <CardTitle className="text-xl text-white flex items-center">
                        <Clock className="w-5 h-5 mr-2" />
                        Recently Generated
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {history.length > 0 ? (
                        <div className="space-y-3">
                          {history.slice(0, 5).map((item) => (
                            <div key={item.id} className="bg-white/5 rounded-lg p-3 border border-white/10">
                              <div className="text-white font-medium text-sm">{item.title}</div>
                              <div className="text-white/60 text-xs mt-1">
                                {item.fileName && (
                                  <span className="block">
                                    {item.uploadType === 'pdf' ? '📄' : item.uploadType === 'image' ? '🖼️' : '📝'} {item.fileName}
                                  </span>
                                )}
                                {new Date(item.createdAt).toLocaleDateString()}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center text-white/60 py-8">
                          <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                          <p>No content generated yet</p>
                          <p className="text-sm">Start creating your first quiz!</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quiz Modal */}
      {showQuiz && renderQuiz()}
    </>
  );
};

export default DashboardPage;
