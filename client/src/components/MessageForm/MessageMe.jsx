import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { AlertCircle, Send, X, Code } from 'lucide-react'
import { useGlitch } from '@/hooks/use-glitch'

export default function MessageMe() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    formNumber: '',
  })
  
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  
  const formRef = useRef(null)
  const { setRef, triggerGlitch, isGlitching } = useGlitch({
    randomInterval: true,
    intervalMin: 5000,
    intervalMax: 15000,
    duration: 300,
    addNoise: true
  })
  
  // Set ref after component mounts
  useEffect(() => {
    setRef(formRef.current)
  }, [setRef])

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'ERR: NAME_REQUIRED'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'ERR: EMAIL_REQUIRED'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'ERR: EMAIL_INVALID'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'ERR: MESSAGE_REQUIRED'
    }
    
    setErrors(newErrors)
    
    if (Object.keys(newErrors).length > 0) {
      triggerGlitch()
    }
    
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log('Form data to be sent:', formData)
      setSubmitted(true)
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        message: '',
        formNumber: '',
      })
    } catch (error) {
      console.error('Error submitting form:', error)
      triggerGlitch()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div 
        ref={formRef}
        className={`relative border-4 border-white p-6 md:p-8 bg-black text-white ${isGlitching ? 'content-glitching' : ''}`}
      >
        <div className="absolute inset-0 bg-scanlines opacity-10 pointer-events-none"></div>
        
        {/* Header */}
        <div className="mb-8 border-b-4 border-white pb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-4xl md:text-5xl font-mono font-bold flex items-center">
              <Code className="mr-2 h-8 w-8" />
              <span className="glitch-text" data-text="CONTACT_ME">CONTACT_ME</span>
            </h2>
            <div className="h-4 w-4 bg-white animate-pulse"></div>
          </div>
          <p className="mt-2 text-gray-400 font-mono">
            {'// Submit your message below'}
          </p>
        </div>
        
        {submitted ? (
          <div className="p-6 border-2 border-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-mono glitch-text" data-text="MESSAGE_RECEIVED">MESSAGE_RECEIVED</h3>
              <Button 
                onClick={() => setSubmitted(false)} 
                variant="ghost"
                className="h-8 w-8 p-0 text-white hover:text-white/80"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <p className="font-mono text-gray-300">Your transmission has been logged. Expect a response within 48 hours.</p>
            <div className="mt-6 p-4 bg-white bg-opacity-10 font-mono text-xs overflow-hidden">
              <div className="animate-glitch">
                <p>{'> transmission_complete'}</p>
                <p>{'> status: 200_OK'}</p>
                <p>{'> timestamp: ' + new Date().toISOString()}</p>
              </div>
            </div>
            <Button 
              onClick={() => setSubmitted(false)} 
              className="mt-6 font-mono bg-white hover:bg-white/80 text-black"
            >
              SEND_ANOTHER
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="name" className="text-lg font-mono">NAME *</Label>
                {errors.name && (
                  <span className="text-red-500 flex items-center text-sm font-mono">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.name}
                  </span>
                )}
              </div>
              <div className="relative">
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`font-mono bg-black border-2 ${errors.name ? 'border-red-500' : 'border-white'} focus:border-white focus:ring-0 text-white`}
                  placeholder="ENTER_YOUR_NAME"
                />
                {errors.name && <div className="absolute right-0 top-0 h-full w-1 bg-red-500 animate-pulse"></div>}
              </div>
            </div>
            
            {/* Email Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="email" className="text-lg font-mono">EMAIL *</Label>
                {errors.email && (
                  <span className="text-red-500 flex items-center text-sm font-mono">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.email}
                  </span>
                )}
              </div>
              <div className="relative">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`font-mono bg-black border-2 ${errors.email ? 'border-red-500' : 'border-white'} focus:border-white focus:ring-0 text-white`}
                  placeholder="YOUR@EMAIL.COM"
                />
                {errors.email && <div className="absolute right-0 top-0 h-full w-1 bg-red-500 animate-pulse"></div>}
              </div>
            </div>
            
            {/* Form Number Field (Optional) */}
            <div className="space-y-2">
              <Label htmlFor="formNumber" className="text-lg font-mono">FORM_NUMBER (OPTIONAL)</Label>
              <Input
                id="formNumber"
                name="formNumber"
                type="number"
                value={formData.formNumber}
                onChange={handleChange}
                className="font-mono bg-black border-2 border-white focus:border-white focus:ring-0 text-white"
                placeholder="0000"
              />
            </div>
            
            {/* Message Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="message" className="text-lg font-mono">MESSAGE *</Label>
                {errors.message && (
                  <span className="text-red-500 flex items-center text-sm font-mono">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.message}
                  </span>
                )}
              </div>
              <div className="relative">
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`font-mono bg-black border-2 min-h-[150px] ${errors.message ? 'border-red-500' : 'border-white'} focus:border-white focus:ring-0 text-white`}
                  placeholder="TYPE_YOUR_MESSAGE_HERE"
                />
                {errors.message && <div className="absolute right-0 top-0 h-full w-1 bg-red-500 animate-pulse"></div>}
              </div>
            </div>
            
            {/* Submit Button */}
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-6 text-lg font-mono bg-white hover:bg-white/80 text-black relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center">
                {isSubmitting ? 'SENDING...' : 'SEND_MESSAGE'}
                <Send className="ml-2 h-5 w-5" />
              </span>
              <span className="absolute inset-0 bg-scanlines opacity-20 group-hover:opacity-40 transition-opacity"></span>
              <span className="absolute inset-0 glitch-image-r"></span>
              <span className="absolute inset-0 glitch-image-g"></span>
              <span className="absolute inset-0 glitch-image-b"></span>
            </Button>
            
            <div className="text-xs font-mono text-gray-500 pt-4 border-t border-white/30">
              <p>{'// All fields marked with * are required'}</p>
              <p>{'// Form v1.0.2 | Last updated: ' + new Date().toLocaleDateString()}</p>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
