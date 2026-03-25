'use client';

import { useState } from 'react';
import { Receipt } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatCurrency, parseCurrencyInput } from '@/lib/formatters';
import { SplitType } from '@/types/session';

interface ExpenseFormData {
  description: string;
  amount: number;
  splitType: SplitType;
  payerId: string;
}

interface ExpenseFormProps {
  participants: Array<{ id: string; name: string }>;
  onSubmit: (data: ExpenseFormData) => void;
  isLoading?: boolean;
}

export function ExpenseForm({ participants, onSubmit, isLoading }: ExpenseFormProps) {
  const [description, setDescription] = useState('');
  const [displayAmount, setDisplayAmount] = useState('');
  const [amount, setAmount] = useState(0);
  const [payerId, setPayerId] = useState('');
  const [splitType, setSplitType] = useState<SplitType>('EQUAL');

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const numericValue = parseCurrencyInput(rawValue);
    setDisplayAmount(formatCurrency(numericValue, false));
    setAmount(numericValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ description, amount, splitType, payerId });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="description">Mô tả</Label>
        <Input
          id="description"
          placeholder="Ví dụ: Lẩu Thái, Bia..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">Số tiền</Label>
        <div className="relative">
          <Input
            id="amount"
            placeholder="0"
            value={displayAmount}
            onChange={handleAmountChange}
            className="pr-8"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            đ
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="payerId">Người trả</Label>
        <Select value={payerId} onValueChange={(v) => v && setPayerId(v)}>
          <SelectTrigger>
            <SelectValue placeholder="Chọn người trả" />
          </SelectTrigger>
          <SelectContent>
            {participants.map((p) => (
              <SelectItem key={p.id} value={p.id}>
                {p.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Chia tiền</Label>
        <Select value={splitType} onValueChange={(v) => v && setSplitType(v as SplitType)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="EQUAL">Chia đều</SelectItem>
            <SelectItem value="EXACT">Theo số tiền</SelectItem>
            <SelectItem value="PERCENTAGE">Theo phần trăm</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading || !description || !amount || !payerId}>
        <Receipt className="mr-2 h-4 w-4" />
        Thêm chi phí
      </Button>
    </form>
  );
}
