import { useState } from 'react';
import { TrendingUp, Users, Car, DollarSign, Plus, Search, Filter, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const DealerDashboard = () => {
  const [viewMode, setViewMode] = useState<'overview' | 'inventory' | 'sales' | 'customers'>('overview');

  // Mock data
  const stats = [
    {
      title: 'Total Inventory',
      value: '127 bikes',
      change: '+12%',
      trend: 'up',
      icon: Car
    },
    {
      title: 'Monthly Sales',
      value: '₹45.2L',
      change: '+8.2%',
      trend: 'up',
      icon: DollarSign
    },
    {
      title: 'Test Rides',
      value: '89',
      change: '+15%',
      trend: 'up',
      icon: Users
    },
    {
      title: 'Inquiries',
      value: '234',
      change: '+23%',
      trend: 'up',
      icon: TrendingUp
    }
  ];

  const inventory = [
    {
      id: 1,
      brand: 'Yamaha',
      model: 'MT-15',
      variant: 'Standard',
      stock: 12,
      price: 165000,
      status: 'In Stock',
      lastUpdated: '2024-01-15'
    },
    {
      id: 2,
      brand: 'Honda',
      model: 'Activa 6G',
      variant: 'DLX',
      stock: 8,
      price: 75000,
      status: 'Low Stock',
      lastUpdated: '2024-01-14'
    },
    {
      id: 3,
      brand: 'Ather',
      model: '450X',
      variant: 'Pro',
      stock: 0,
      price: 145000,
      status: 'Out of Stock',
      lastUpdated: '2024-01-13'
    },
    {
      id: 4,
      brand: 'TVS',
      model: 'iQube Electric',
      variant: 'S',
      stock: 6,
      price: 115000,
      status: 'In Stock',
      lastUpdated: '2024-01-12'
    },
    {
      id: 5,
      brand: 'Royal Enfield',
      model: 'Classic 350',
      variant: 'Signals',
      stock: 15,
      price: 195000,
      status: 'In Stock',
      lastUpdated: '2024-01-11'
    }
  ];

  const recentSales = [
    {
      id: 1,
      customer: 'Rajesh Kumar',
      bike: 'Yamaha MT-15',
      amount: 165000,
      date: '2024-01-16',
      status: 'Completed'
    },
    {
      id: 2,
      customer: 'Priya Sharma',
      bike: 'Honda Activa 6G',
      amount: 75000,
      date: '2024-01-15',
      status: 'Completed'
    },
    {
      id: 3,
      customer: 'Arjun Reddy',
      bike: 'Ather 450X',
      amount: 145000,
      date: '2024-01-14',
      status: 'Processing'
    },
    {
      id: 4,
      customer: 'Meera Singh',
      bike: 'TVS iQube',
      amount: 115000,
      date: '2024-01-13',
      status: 'Completed'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'in stock':
        return 'bg-green-100 text-green-800';
      case 'low stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'out of stock':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-600">{stat.change}</span>
                    </div>
                  </div>
                  <Icon className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Sales Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-surface rounded-lg">
              <p className="text-muted-foreground">Sales chart placeholder</p>
            </div>
          </CardContent>
        </Card>

        {/* Inventory Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Inventory by Brand</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-surface rounded-lg">
              <p className="text-muted-foreground">Inventory chart placeholder</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentSales.slice(0, 5).map((sale) => (
              <div key={sale.id} className="flex items-center justify-between p-4 bg-surface rounded-lg">
                <div>
                  <p className="font-medium">{sale.customer}</p>
                  <p className="text-sm text-muted-foreground">{sale.bike}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{formatPrice(sale.amount)}</p>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(sale.status)}>
                      {sale.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{sale.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderInventory = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Inventory Management</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Bike
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search bikes..." className="pl-10" />
        </div>
        <Select>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by brand" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Brands</SelectItem>
            <SelectItem value="yamaha">Yamaha</SelectItem>
            <SelectItem value="honda">Honda</SelectItem>
            <SelectItem value="ather">Ather</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="in-stock">In Stock</SelectItem>
            <SelectItem value="low-stock">Low Stock</SelectItem>
            <SelectItem value="out-of-stock">Out of Stock</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Inventory Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bike</TableHead>
                <TableHead>Variant</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{item.brand} {item.model}</div>
                    </div>
                  </TableCell>
                  <TableCell>{item.variant}</TableCell>
                  <TableCell>{item.stock}</TableCell>
                  <TableCell>{formatPrice(item.price)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.lastUpdated}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Demo Login Notice */}
      <div className="bg-warning/10 border-b border-warning/20 p-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-warning-foreground">
            <strong>Demo Mode:</strong> This is a preview of the dealer dashboard. Login functionality coming soon.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dealer Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your inventory, sales, and customer interactions
          </p>
        </div>

        {/* Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'overview', label: 'Overview' },
              { key: 'inventory', label: 'Inventory' },
              { key: 'sales', label: 'Sales' },
              { key: 'customers', label: 'Customers' }
            ].map(({ key, label }) => (
              <Button
                key={key}
                variant={viewMode === key ? 'default' : 'outline'}
                onClick={() => setViewMode(key as any)}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        {/* Content */}
        {viewMode === 'overview' && renderOverview()}
        {viewMode === 'inventory' && renderInventory()}
        {viewMode === 'sales' && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Sales Analytics</h2>
            <p className="text-muted-foreground mb-8">
              Detailed sales reports and analytics coming soon
            </p>
            <Button variant="outline">Request Demo</Button>
          </div>
        )}
        {viewMode === 'customers' && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Customer Management</h2>
            <p className="text-muted-foreground mb-8">
              Customer relationship management features coming soon
            </p>
            <Button variant="outline">Request Demo</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DealerDashboard;