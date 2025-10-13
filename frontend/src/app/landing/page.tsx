'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Brain, MessageCircle, Shield, Zap, Users, TrendingUp, Award, ArrowRight, Play, Star, Building2, Globe, Clock } from "lucide-react";
import BlurFade from "@/components/ui/blur-fade";
import HeroFuturistic from "@/components/ui/hero-futuristic";

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      if (response.ok) {
        setIsSubmitted(true);
        setEmail('');
      } else {
        alert('Failed to join waitlist. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to join waitlist. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-black rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-sm">V</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">Veloria</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#solutions" className="text-gray-600 hover:text-gray-900 font-medium">
                Solutions
              </Link>
              <Link href="#enterprise" className="text-gray-600 hover:text-gray-900 font-medium">
                Enterprise
              </Link>
              <Link href="#research" className="text-gray-600 hover:text-gray-900 font-medium">
                Research
              </Link>
              <Link href="#company" className="text-gray-600 hover:text-gray-900 font-medium">
                Company
              </Link>
              <Button variant="outline" size="sm">
                Book a Demo
              </Button>
              <Button size="sm" className="bg-black hover:bg-gray-800">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Futuristic Hero Section */}
      <HeroFuturistic 
        title="Breakthrough AI Therapy"
        subtitle="Revolutionary mental health solutions powered by advanced AI, voice interaction, and immersive 3D experiences"
        buttonText="Explore Solutions"
        onButtonClick={() => {
          document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Full-Stack AI Solutions */}
      <section className="py-20 bg-gray-50" id="solutions">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Full-Stack AI Therapy Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Outcomes delivered with world-class AI models, voice interaction, and deployment infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-black hover:bg-gray-800">
                Book a Demo
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-3">AI Therapy Models</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Adapt best-in-class foundation models to therapeutic use cases with specialized training and RLHF.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Voice Integration</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Real-time voice synthesis and processing for natural therapeutic conversations.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Enterprise Security</h3>
                <p className="text-gray-600 text-sm mb-4">
                  HIPAA-compliant infrastructure with end-to-end encryption for healthcare data.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Deployment Platform</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Full-stack platform for deploying AI therapy solutions at enterprise scale.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 text-center">
            <p className="text-sm text-gray-500 mb-4">AI THERAPY PROVIDERS WE PARTNER WITH:</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <span className="text-gray-400 font-semibold">OpenAI</span>
              <span className="text-gray-400 font-semibold">Google</span>
              <span className="text-gray-400 font-semibold">Anthropic</span>
              <span className="text-gray-400 font-semibold">ElevenLabs</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlurFade delay={0.3}>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Revolutionary AI Therapy Experience
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Combining cutting-edge AI, voice technology, and immersive 3D interactions
              </p>
            </div>
          </BlurFade>

          <div className="grid md:grid-cols-3 gap-8">
            <BlurFade delay={0.4}>
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <Brain className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Advanced AI Therapist</h3>
                  <p className="text-gray-600">
                    Powered by state-of-the-art language models trained on therapeutic techniques 
                    and mental health best practices.
                  </p>
                </CardContent>
              </Card>
            </BlurFade>

            <BlurFade delay={0.5}>
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <MessageCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Real-Time Voice Interaction</h3>
                  <p className="text-gray-600">
                    Natural conversations with ElevenLabs voice synthesis for a human-like 
                    therapeutic experience.
                  </p>
                </CardContent>
              </Card>
            </BlurFade>

            <BlurFade delay={0.6}>
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Privacy & Security</h3>
                  <p className="text-gray-600">
                    HIPAA-compliant platform with end-to-end encryption ensuring your 
                    conversations remain completely private.
                  </p>
                </CardContent>
              </Card>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* Enterprise Solutions */}
      <section className="py-20 bg-white" id="enterprise">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Enterprise AI Therapy Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform your organization's mental health support with agentic AI solutions that continuously improve with human interaction.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <Card className="p-8 border border-gray-200 hover:border-gray-300 transition-colors">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <Building2 className="w-8 h-8 text-blue-600 mr-3" />
                  <div>
                    <h3 className="text-xl font-semibold">Healthcare Providers</h3>
                    <p className="text-gray-600">AI Therapy for Patient Care</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">
                  Integrate AI therapy into your healthcare workflow for 24/7 patient support and reduced therapist workload.
                </p>
                <Button variant="outline" className="w-full">
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="p-8 border border-gray-200 hover:border-gray-300 transition-colors">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <Globe className="w-8 h-8 text-green-600 mr-3" />
                  <div>
                    <h3 className="text-xl font-semibold">Enterprise</h3>
                    <p className="text-gray-600">Employee Mental Health Solutions</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">
                  Provide comprehensive mental health support for your workforce with AI-powered therapy and wellness programs.
                </p>
                <Button variant="outline" className="w-full">
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Research & Market Opportunity */}
      <section className="py-20 bg-gray-50" id="research">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frontier AI Therapy Research
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              HEAL (Healthcare, Evaluations, and AI Lab) is our research initiative to improve therapeutic AI capabilities through rigorous evaluation and novel research.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">$5.6B</div>
              <p className="text-gray-600">Mental health software market by 2026</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">970M</div>
              <p className="text-gray-600">People with mental health disorders globally</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">23%</div>
              <p className="text-gray-600">Annual market growth rate</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">90%</div>
              <p className="text-gray-600">Cost reduction vs traditional therapy</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 border-0 shadow-sm">
              <CardContent className="p-0">
                <h3 className="text-lg font-semibold mb-2">Therapy Effectiveness</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Research on AI therapy outcomes and patient satisfaction metrics.
                </p>
                <Button variant="ghost" size="sm" className="p-0 h-auto">
                  Read Research
                  <ArrowRight className="ml-1 w-3 h-3" />
                </Button>
              </CardContent>
            </Card>

            <Card className="p-6 border-0 shadow-sm">
              <CardContent className="p-0">
                <h3 className="text-lg font-semibold mb-2">Safety & Ethics</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Comprehensive safety evaluations for AI therapy deployment.
                </p>
                <Button variant="ghost" size="sm" className="p-0 h-auto">
                  Read Research
                  <ArrowRight className="ml-1 w-3 h-3" />
                </Button>
              </CardContent>
            </Card>

            <Card className="p-6 border-0 shadow-sm">
              <CardContent className="p-0">
                <h3 className="text-lg font-semibold mb-2">Clinical Validation</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Peer-reviewed studies on AI therapy clinical effectiveness.
                </p>
                <Button variant="ghost" size="sm" className="p-0 h-auto">
                  Read Research
                  <ArrowRight className="ml-1 w-3 h-3" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              We have changed the game of AI therapy—hear it from our customers.
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From AI therapy to voice interaction to enterprise deployment, learn from experts why Veloria is key to any mental health strategy.
            </p>
          </div>
          
          <div className="text-center text-gray-500">
            Loading testimonials...
          </div>
        </div>
      </section>

      {/* Early Access CTA */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            The future of mental healthcare starts here
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join leading healthcare organizations and enterprises deploying AI therapy solutions at scale.
          </p>

          {!isSubmitted ? (
            <div className="max-w-md mx-auto">
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-white text-gray-900 border-0 h-12"
                />
                <Button type="submit" size="lg" className="w-full bg-white text-black hover:bg-gray-100 h-12">
                  Get Early Access
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </form>
              <p className="text-sm text-gray-400 mt-4">
                Join 1,000+ healthcare professionals on our waitlist
              </p>
            </div>
          ) : (
            <div className="max-w-md mx-auto">
              <div className="bg-green-600 rounded-lg p-8">
                <CheckCircle className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Welcome to the future!</h3>
                <p className="text-green-100">
                  We'll be in touch soon with early access details.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
                  <span className="text-black font-bold text-sm">V</span>
                </div>
                <span className="text-xl font-semibold text-white">Veloria</span>
              </div>
              <p className="text-gray-400 text-sm">
                Transforming mental healthcare with breakthrough AI therapy solutions.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#solutions" className="hover:text-white">AI Therapy</Link></li>
                <li><Link href="#enterprise" className="hover:text-white">Enterprise</Link></li>
                <li><Link href="#research" className="hover:text-white">Research</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-white">About</Link></li>
                <li><Link href="#" className="hover:text-white">Careers</Link></li>
                <li><Link href="#" className="hover:text-white">Blog</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-white">Documentation</Link></li>
                <li><Link href="#" className="hover:text-white">Support</Link></li>
                <li><Link href="#" className="hover:text-white">Privacy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Veloria. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <Link href="#" className="hover:text-white">Privacy Policy</Link>
              <Link href="#" className="hover:text-white">Terms of Service</Link>
              <Link href="#" className="hover:text-white">Security</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
