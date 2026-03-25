'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Trash2, Users, Sparkles, Receipt, Split } from 'lucide-react';

interface Participant {
  id: string;
  name: string;
  paid: number;
}

export default function DashboardPage() {
  const [billName, setBillName] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [participants, setParticipants] = useState<Participant[]>([
    { id: '1', name: '', paid: 0 },
    { id: '2', name: '', paid: 0 },
  ]);

  const addParticipant = () => {
    setParticipants([
      ...participants,
      { id: Date.now().toString(), name: '', paid: 0 },
    ]);
  };

  const removeParticipant = (id: string) => {
    if (participants.length > 2) {
      setParticipants(participants.filter((p) => p.id !== id));
    }
  };

  const updateParticipant = (id: string, field: 'name' | 'paid', value: string | number) => {
    setParticipants(
      participants.map((p) =>
        p.id === id ? { ...p, [field]: value } : p
      )
    );
  };

  const totalPaid = participants.reduce((sum, p) => sum + Number(p.paid), 0);
  const perPerson = participants.length > 0 ? Math.ceil(totalPaid / participants.length) : 0;

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-400 via-rose-400 to-pink-400 p-4">
      <div className="max-w-lg mx-auto space-y-6">
        {/* Header */}
        <div className="text-center text-white pt-6">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Chia bill siêu nhanh</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">
            Tạo bill mới ✨
          </h1>
          <p className="text-white/80">
            Nhập thông tin và để chúng tôi lo phần tính toán
          </p>
        </div>

        {/* Bill Info Card */}
        <Card className="bg-white/95 backdrop-blur shadow-xl border-0 overflow-hidden">
          <CardContent className="p-6 space-y-5">
            {/* Bill Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Receipt className="w-4 h-4 text-orange-500" />
                Tên bill
              </label>
              <Input
                placeholder="Ví dụ: Team lunch, Cafe chiều..."
                value={billName}
                onChange={(e) => setBillName(e.target.value)}
                className="border-rose-200 focus:border-rose-400 focus:ring-rose-400"
              />
            </div>

            {/* Total Amount */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <span className="text-lg">💰</span>
                Tổng số tiền
              </label>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="0"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(e.target.value)}
                  className="text-2xl font-bold pr-10 border-rose-200 focus:border-rose-400 focus:ring-rose-400"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                  đ
                </span>
              </div>
            </div>

            {/* Participants */}
            <div className="space-y-3">
              <label className="text-sm font-medium flex items-center gap-2">
                <Users className="w-4 h-4 text-rose-500" />
                Ai tham gia? ({participants.length} người)
              </label>

              <div className="space-y-2">
                {participants.map((p, index) => (
                  <div key={p.id} className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-rose-400 flex items-center justify-center text-white text-sm font-medium">
                      {index + 1}
                    </div>
                    <Input
                      placeholder={`Tên người ${index + 1}`}
                      value={p.name}
                      onChange={(e) => updateParticipant(p.id, 'name', e.target.value)}
                      className="flex-1 border-rose-200 focus:border-rose-400 focus:ring-rose-400"
                    />
                    <Input
                      type="number"
                      placeholder="Đã trả"
                      value={p.paid || ''}
                      onChange={(e) => updateParticipant(p.id, 'paid', Number(e.target.value))}
                      className="w-28 border-rose-200 focus:border-rose-400 focus:ring-rose-400"
                    />
                    {participants.length > 2 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeParticipant(p.id)}
                        className="text-rose-400 hover:text-rose-600 hover:bg-rose-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                onClick={addParticipant}
                className="w-full border-dashed border-rose-300 text-rose-500 hover:bg-rose-50 hover:border-rose-400"
              >
                <Plus className="w-4 h-4 mr-2" />
                Thêm người
              </Button>
            </div>

            {/* Summary */}
            {totalPaid > 0 && (
              <div className="bg-gradient-to-r from-orange-50 to-rose-50 rounded-xl p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tổng đã chi:</span>
                  <span className="font-semibold text-rose-600">
                    {totalPaid.toLocaleString('vi-VN')}đ
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Mỗi người:</span>
                  <span className="font-semibold text-orange-600">
                    ~{perPerson.toLocaleString('vi-VN')}đ
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            className="w-full h-12 text-lg bg-white text-rose-500 hover:bg-rose-50 shadow-lg"
            disabled={!billName || !totalAmount}
          >
            <Split className="w-5 h-5 mr-2" />
            Chia bill ngay!
          </Button>
          <Button
            variant="ghost"
            className="w-full text-white/80 hover:text-white hover:bg-white/10"
          >
            💡 Xem các bill trước đó
          </Button>
        </div>

        {/* Vibe Footer */}
        <div className="text-center text-white/60 text-sm pb-8">
          Made with ❤️ for splitting bills the fun way
        </div>
      </div>
    </main>
  );
}
