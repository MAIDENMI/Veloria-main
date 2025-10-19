'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Brain, MessageCircle, Shield, Heart, Clock, Sparkles } from "lucide-react";
import BlurFade from "@/components/ui/blur-fade";
import Image from "next/image";

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Track email form submission
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'submit', {
        event_category: 'engagement',
        event_label: 'email_form_submit',
        value: 1
      });
    }
    
    // Redirect to Google Form for early access signup
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSfY-zP_9lekDjqvTtvDpZTxsFyqKwHHkHe4ZU1jLkqMN7VbUg/viewform?usp=dialog', '_blank');
  };

  const handleGetEarlyAccess = () => {
    // Track Google Analytics event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'click', {
        event_category: 'engagement',
        event_label: 'get_early_access',
        value: 1
      });
    }
    
    // Redirect to Google Form for early access signup
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSfY-zP_9lekDjqvTtvDpZTxsFyqKwHHkHe4ZU1jLkqMN7VbUg/viewform?usp=dialog', '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-28">
            <div className="flex items-center -ml-2">
              <Image 
                src="/logon2.png" 
                alt="Veloria" 
                width={350} 
                height={120}
                className="w-auto h-24"
              />
            </div>
            <div className="flex items-center">
              <Button 
                size="sm" 
                className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-full"
                onClick={handleGetEarlyAccess}
              >
                Get Early Access
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Text */}
            <div className="max-w-2xl">
              <BlurFade delay={0.1} yOffset={30} duration={0.8}>
                <h1 className="text-6xl md:text-7xl font-bold mb-8 tracking-tight leading-none">
                  Meet <span className="text-cyan-400">Veloria</span>
                </h1>
              </BlurFade>
              
              <BlurFade delay={0.3} yOffset={20} duration={0.6}>
                <p className="text-xl md:text-2xl text-gray-700 mb-10 leading-relaxed font-light">
                  An AI therapist that understands your emotions, provides personalized support, and adapts to your mental health journey, from day one.
                </p>
              </BlurFade>

              <BlurFade delay={0.5} yOffset={20} duration={0.6}>
                <Button 
                  size="lg" 
                  className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg rounded-full"
                  onClick={handleGetEarlyAccess}
                >
                  Get Early Access
                </Button>
              </BlurFade>
            </div>

            {/* Right Side - UI Mockups */}
            <div className="relative w-full">
              <BlurFade delay={0.4}>
                {/* Mobile/Tablet Layout - Stack vertically */}
                <div className="block lg:hidden">
                  {/* Main Image */}
                  <div className="flex justify-center mb-8">
                    <Image 
                      src="/hero1.png" 
                      alt="Live Therapy Session with Veloria" 
                      width={320} 
                      height={220}
                      className="rounded-2xl shadow-2xl border border-gray-200 w-[280px] sm:w-[320px] h-auto"
                    />
                  </div>
                  
                  {/* Panels in 2x2 Grid */}
                  <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto mb-6">
                    {/* Chat Interface */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"></div>
                        <div>
                          <div className="font-semibold text-gray-900 text-xs">Sarah</div>
                          <div className="text-xs text-green-500">● Online</div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="bg-gray-100 rounded-lg p-2 text-xs">
                          How are you feeling today?
                        </div>
                        <div className="bg-purple-500 text-white rounded-lg p-2 text-xs">
                          I've been anxious about work lately
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-1">
                        <input 
                          placeholder="Type message..."
                          className="flex-1 bg-gray-100 rounded-full px-2 py-1 text-xs"
                        />
                        <button className="w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
                          <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Mood Tracking */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-3">
                      <div className="text-xs font-semibold text-gray-900 mb-2">Mood Tracking</div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-600">Today</span>
                          <div className="flex gap-1 items-center">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="text-xs text-gray-500">Calm</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-600">Yesterday</span>
                          <div className="flex gap-1 items-center">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                            <span className="text-xs text-gray-500">Anxious</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-600">This Week</span>
                          <div className="flex gap-1 items-center">
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            <span className="text-xs text-gray-500">Improving</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Session Insights */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-3">
                      <div className="text-sm font-semibold text-gray-900 mb-2">Session Insights</div>
                      <div className="space-y-2 text-xs text-gray-600">
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1 flex-shrink-0"></div>
                          <span>Identified work stress as primary trigger</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1 flex-shrink-0"></div>
                          <span>Recommended breathing exercises</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1 flex-shrink-0"></div>
                          <span>Progress: Anxiety levels decreasing</span>
                        </div>
                      </div>
                    </div>

                    {/* Weekly Progress */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-3">
                      <div className="text-sm font-semibold text-gray-900 mb-2">Weekly Progress</div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">This Week</span>
                          <span className="text-green-600 font-medium">+15%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-green-400 h-1.5 rounded-full w-3/4"></div>
                        </div>
                        <div className="text-xs text-gray-500">
                          Consistent improvement in emotional regulation
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Caption */}
                  <div className="text-center">
                    <div className="inline-block bg-black/80 text-white px-4 py-2 rounded-full text-sm font-medium">
                      See how Veloria brings empathy and intelligence together.
                    </div>
                  </div>
                </div>

                {/* Desktop Layout - Floating panels around center image */}
                <div className="hidden lg:block relative min-h-[700px]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    
                    {/* Main Therapy Session Image - Center */}
                    <div className="relative z-10">
                      <Image 
                        src="/hero1.png" 
                        alt="Live Therapy Session with Veloria" 
                        width={400} 
                        height={280}
                        className="rounded-2xl shadow-2xl border border-gray-200"
                      />
                    </div>

                    {/* Chat Interface - Top Left */}
                    <div className="absolute top-16 left-8 w-56 bg-white rounded-xl shadow-xl border border-gray-200 p-3 z-20">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"></div>
                        <div>
                          <div className="font-semibold text-gray-900 text-xs">Sarah</div>
                          <div className="text-xs text-green-500">● Online</div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="bg-gray-100 rounded-lg p-2 text-xs">
                          How are you feeling today?
                        </div>
                        <div className="bg-purple-500 text-white rounded-lg p-2 text-xs ml-2">
                          I've been anxious about work lately
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-1">
                        <input 
                          placeholder="Type message..."
                          className="flex-1 bg-gray-100 rounded-full px-2 py-1 text-xs"
                        />
                        <button className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                          <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Mood Tracking Panel - Top Right */}
                    <div className="absolute top-16 right-8 w-52 bg-white rounded-xl shadow-xl border border-gray-200 p-3 z-20">
                      <div className="text-xs font-semibold text-gray-900 mb-2">Mood Tracking</div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-600">Today</span>
                          <div className="flex gap-1 items-center">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="text-xs text-gray-500">Calm</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-600">Yesterday</span>
                          <div className="flex gap-1 items-center">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                            <span className="text-xs text-gray-500">Anxious</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-600">This Week</span>
                          <div className="flex gap-1 items-center">
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            <span className="text-xs text-gray-500">Improving</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Session Insights - Bottom Left */}
                    <div className="absolute bottom-16 left-8 w-64 bg-white rounded-xl shadow-xl border border-gray-200 p-4 z-20">
                      <div className="text-sm font-semibold text-gray-900 mb-3">Session Insights</div>
                      <div className="space-y-2 text-xs text-gray-600">
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1 flex-shrink-0"></div>
                          <span>Identified work stress as primary trigger</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1 flex-shrink-0"></div>
                          <span>Recommended breathing exercises</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1 flex-shrink-0"></div>
                          <span>Progress: Anxiety levels decreasing</span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Indicator - Bottom Right */}
                    <div className="absolute bottom-16 right-8 w-60 bg-white rounded-xl shadow-xl border border-gray-200 p-4 z-20">
                      <div className="text-sm font-semibold text-gray-900 mb-3">Weekly Progress</div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">This Week</span>
                          <span className="text-green-600 font-medium">+15%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-green-400 h-1.5 rounded-full w-3/4"></div>
                        </div>
                        <div className="text-xs text-gray-500">
                          Consistent improvement in emotional regulation
                        </div>
                      </div>
                    </div>

                    {/* Caption */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-6 py-3 rounded-full text-sm font-medium whitespace-nowrap z-30">
                      See how Veloria brings empathy and intelligence together.
                    </div>

                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlurFade delay={0.1} yOffset={50} duration={1.0} inViewMargin="0px">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold text-black mb-8 tracking-tight">
                Intelligence that understands you
              </h2>
            </div>
          </BlurFade>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            <BlurFade delay={0.2}>
              <div className="text-left">
                {/* Lightning Icon */}
                <div className="w-12 h-12 mb-6">
                  <svg className="w-full h-full text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">Zero setup, unified context</h3>
                <p className="text-gray-600 leading-relaxed">
                  Start talking immediately. Veloria understands your emotional context and adapts to your mental health journey.
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.3}>
              <div className="text-left">
                {/* Growth Chart Icon */}
                <div className="w-12 h-12 mb-6">
                  <svg className="w-full h-full text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">Evolves with you</h3>
                <p className="text-gray-600 leading-relaxed">
                  Veloria learns your patterns, adapts to shifting priorities and gets smarter with every interaction about your mental health journey.
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.4}>
              <div className="text-left">
                {/* Shield Check Icon */}
                <div className="w-12 h-12 mb-6">
                  <svg className="w-full h-full text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">Privacy by design</h3>
                <p className="text-gray-600 leading-relaxed">
                  End-to-end encrypted and secure. You decide what Veloria learns, how long she keeps it, and approve every action with granular permissions.
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.5}>
              <div className="text-left">
                {/* Target Icon */}
                <div className="w-12 h-12 mb-6">
                  <svg className="w-full h-full text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10Z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">Built to keep you ahead</h3>
                <p className="text-gray-600 leading-relaxed">
                  Mental health support that handles emotional needs before they become overwhelming. She's designed to keep you balanced and focused.
                </p>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* See Veloria in Action Section */}
      <section className="py-32 bg-gradient-to-br from-purple-50/30 via-pink-50/20 to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Left Side - Text */}
            <div className="max-w-2xl">
              <BlurFade delay={0.1}>
                <h2 className="text-5xl md:text-6xl font-bold text-black mb-6 tracking-tight">
                  See <span className="text-cyan-400">Veloria</span> <span className="block">in action</span>
                </h2>
              </BlurFade>
              <BlurFade delay={0.2}>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Experience real-time AI therapy sessions with natural conversation, emotional understanding, and personalized support tailored to your mental health journey.
                </p>
              </BlurFade>
              <BlurFade delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 text-lg rounded-full shadow-lg"
                    onClick={handleGetEarlyAccess}
                  >
                    Try Veloria Now
                  </Button>
                  <Button 
                    variant="outline"
                    size="lg" 
                    className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg rounded-full"
                  >
                    Learn More
                  </Button>
                </div>
              </BlurFade>
            </div>

            {/* Right Side - Enhanced Video */}
            <div className="relative flex justify-center lg:justify-end">
              <BlurFade delay={0.4}>
                <div className="relative">
                  {/* Background Glow Effect */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 rounded-3xl blur-xl"></div>
                  
                  {/* Video Container */}
                  <div className="relative bg-white p-2 rounded-3xl shadow-2xl">
                    <video 
                      className="w-full max-w-sm h-auto rounded-2xl"
                      autoPlay 
                      loop 
                      muted 
                      playsInline
                    >
                      <source src="/veloriavideo1.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-cyan-400 rounded-full animate-pulse"></div>
                  <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-purple-400 rounded-full animate-bounce"></div>
                  <div className="absolute top-1/2 -left-8 w-4 h-4 bg-pink-400 rounded-full animate-ping"></div>
                </div>
              </BlurFade>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 bg-gradient-to-br from-blue-50/40 via-purple-50/30 to-pink-50/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlurFade delay={0.1}>
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 tracking-tight">
                What people are saying
              </h2>
            </div>
          </BlurFade>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <BlurFade delay={0.2}>
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">S</span>
                  </div>
                </div>
                <blockquote className="text-gray-800 text-lg leading-relaxed mb-6 text-center">
                  "It felt like talking to someone who actually understood. I could open up without fear."
                </blockquote>
                <div className="text-center">
                  <div className="font-semibold text-gray-900 text-lg">Sophia</div>
                  <div className="text-gray-600">Student</div>
                </div>
              </div>
            </BlurFade>

            <BlurFade delay={0.3}>
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">D</span>
                  </div>
                </div>
                <blockquote className="text-gray-800 text-lg leading-relaxed mb-6 text-center">
                  "Veloria helped me manage my stress during finals. The calm voice and breathing reminders really worked."
                </blockquote>
                <div className="text-center">
                  <div className="font-semibold text-gray-900 text-lg">David</div>
                  <div className="text-gray-600">Graduate Student</div>
                </div>
              </div>
            </BlurFade>

            <BlurFade delay={0.4}>
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">L</span>
                  </div>
                </div>
                <blockquote className="text-gray-800 text-lg leading-relaxed mb-6 text-center">
                  "I didn't expect an AI to sound this human. It listens, adapts, and remembers my emotions."
                </blockquote>
                <div className="text-center">
                  <div className="font-semibold text-gray-900 text-lg">Liam</div>
                  <div className="text-gray-600">Marketing Professional</div>
                </div>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-32 bg-gradient-to-b from-gray-50/30 via-gray-100/20 to-gray-50/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BlurFade delay={0.1}>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-12 tracking-tight whitespace-nowrap">
              Support whenever you need it
            </h2>
          </BlurFade>

          <BlurFade delay={0.2}>
            {/* Clock Icon */}
            <div className="flex justify-center mb-12">
              <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center">
                <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z"/>
                  </svg>
                </div>
              </div>
            </div>
          </BlurFade>

          <BlurFade delay={0.3}>
            <div className="space-y-8 text-gray-700">
              <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
                Veloria is always here for you, no matter the time of day. Whether it's a moment of crisis or just a late-night check-in, support is always a tap away.
              </p>
              
              <div className="pt-8">
                <p className="text-xl md:text-2xl font-semibold text-gray-900">
                  Your well-being is our commitment.
                </p>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Early Access CTA */}
      <section className="py-32 bg-gradient-to-b from-pink-50/30 via-pink-50/50 to-pink-100/40" id="waitlist">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BlurFade delay={0.1}>
            <h2 className="text-5xl md:text-6xl font-bold text-black mb-12 tracking-tight">
              Start your day<br />with Veloria
            </h2>
          </BlurFade>

          {!isSubmitted ? (
            <BlurFade delay={0.2}>
              <div className="max-w-sm mx-auto">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-white text-gray-900 border-gray-300 h-12 text-base px-6 rounded-full text-center placeholder:text-gray-400"
                  />
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="bg-gray-800 text-white hover:bg-gray-900 h-12 font-medium text-base rounded-full px-8"
                  >
                    Join Early Access
                  </Button>
                </form>
              </div>
            </BlurFade>
          ) : (
            <BlurFade delay={0.2}>
              <div className="max-w-md mx-auto">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-500" />
                  <h3 className="text-xl font-semibold mb-2 text-black">Welcome to the future!</h3>
                  <p className="text-gray-600">
                    We'll be in touch soon with early access details.
                  </p>
                </div>
              </div>
            </BlurFade>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlurFade delay={0.1}>
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <BlurFade delay={0.2}>
                <div className="flex items-center mb-4 md:mb-0">
                  <Image 
                    src="/footern2.png" 
                    alt="Veloria" 
                    width={400} 
                    height={120}
                    className="w-auto h-24"
                  />
                </div>
              </BlurFade>
              <BlurFade delay={0.3}>
                <div className="flex space-x-8 text-sm text-gray-500">
                  <Link href="#" className="hover:text-black transition-colors">Privacy Policy</Link>
                  <Link href="#" className="hover:text-black transition-colors">Terms of Service</Link>
                  <span>© 2024 Veloria</span>
                </div>
              </BlurFade>
            </div>
          </BlurFade>
          
          <BlurFade delay={0.4}>
            <div className="text-center border-t border-gray-200 pt-6">
              <p className="text-sm text-gray-500">
                Veloria does not replace professional healthcare or therapy services.
              </p>
            </div>
          </BlurFade>
        </div>
      </footer>
    </div>
  );
}
