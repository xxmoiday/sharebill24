import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Landing() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-400 via-rose-400 flex flex-col items-center justify-center px-4">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
          Split the bill,
          <br />
          not the vibe
        </h1>
        <p className="text-lg text-white/80 mb-8 max-w-md">
          Chia tiền bill thông minh, nhanh chóng và vui vẻ
          <br />
          Không để những khoản tính cản trở vibe của nhóm bạn
        </p>
        <div className="flex gap-4 mt-8">
          <Link href="/register">
            <Button size="lg" variant="secondary" className="w-full">
              Đăng ký
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" className="w-full bg-white text-orange-500 hover:bg-orange-50">
              Đăng nhập
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
