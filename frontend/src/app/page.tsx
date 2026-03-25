import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles, Split, ArrowRight } from 'lucide-react';

export default function Landing() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-400 via-rose-400 to-pink-400 flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 text-6xl opacity-20 animate-bounce">🍕</div>
      <div className="absolute top-40 right-20 text-5xl opacity-20 animate-pulse">☕</div>
      <div className="absolute bottom-32 left-20 text-4xl opacity-20">🧋</div>
      <div className="absolute bottom-20 right-10 text-5xl opacity-20">🎉</div>

      <div className="text-center space-y-8 relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm">
          <Sparkles className="w-4 h-4" />
          Siêu nhanh, siêu vui
        </div>

        {/* Main CTA */}
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-white sm:text-6xl md:text-7xl leading-tight">
            Split the bill,
            <br />
            <span className="text-white/90">not the vibe</span>
          </h1>
          <p className="text-xl text-white/80 max-w-md mx-auto">
            Chia tiền bill thông minh
            <br />
            Không để những khoản tính cản trở vibe của nhóm bạn
          </p>
        </div>

        {/* Primary Action */}
        <div className="space-y-4">
          <Link href="/new">
            <Button 
              size="lg" 
              className="h-14 px-8 text-lg bg-white text-rose-500 hover:bg-rose-50 shadow-xl hover:shadow-2xl transition-all hover:scale-105"
            >
              <Split className="w-5 h-5 mr-2" />
              Chia bill ngay
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>

          {/* Secondary Actions */}
          <div className="flex items-center justify-center gap-4 text-white/80 text-sm">
            <span>Hoặc</span>
            <Link href="/register" className="hover:text-white underline-offset-4 hover:underline">
              Đăng ký
            </Link>
            <span>•</span>
            <Link href="/login" className="hover:text-white underline-offset-4 hover:underline">
              Đăng nhập
            </Link>
          </div>
        </div>

        {/* Social Proof */}
        <div className="pt-8 text-white/60 text-sm">
          Đã có <span className="text-white font-semibold">2,847</span> bill được chia vui vẻ ✨
        </div>
      </div>
    </main>
  );
}
