'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Users, Receipt, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  const [groups] = useState([
    { id: 1, name: 'Team lunch', members: 5, total: 850000 },
    { id: 2, name: 'Trip Đà Lạt', members: 8, total: 4200000 },
  ]);

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Xin chào! 👋</h1>
          <p className="text-muted-foreground">Quản lý chi tiêu nhóm của bạn</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Tạo nhóm mới
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Nhóm active
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Thành viên
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              <Users className="w-5 h-5 text-orange-500" />
              15
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tổng bill
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              <Receipt className="w-5 h-5 text-rose-500" />
              12
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Đã chi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              5.05M
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Groups */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Nhóm gần đây</h2>
        {groups.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <Users className="w-12 h-12 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground mb-4">
                Chưa có nhóm nào. Tạo nhóm đầu tiên!
              </p>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Tạo nhóm
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {groups.map((group) => (
              <Card key={group.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="flex items-center justify-between p-4">
                  <div>
                    <h3 className="font-medium">{group.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {group.members} thành viên
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-orange-500">
                      {group.total.toLocaleString('vi-VN')}đ
                    </div>
                    <p className="text-xs text-muted-foreground">tổng chi</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
