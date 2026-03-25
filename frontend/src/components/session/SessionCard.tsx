'use client';

import Link from 'next/link';
import { Calendar, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Session } from '@/types/session';
import { getVibeConfig } from '@/lib/vibe-config';
import { formatCurrency, formatDateShort } from '@/lib/formatters';

interface SessionCardProps {
  session: Session;
}

export function SessionCard({ session }: SessionCardProps) {
  const vibeConfig = getVibeConfig(session.vibe);

  return (
    <Link href={`/sessions/${session.id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-md cursor-pointer">
        <div className={`h-1 bg-gradient-to-r ${vibeConfig.gradient}`} />
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-lg">{vibeConfig.emoji}</span>
                <h3 className="font-semibold truncate">{session.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{vibeConfig.label}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg">{formatCurrency(session.totalAmount)}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDateShort(session.date)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{session.participants?.length || 0} người</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
