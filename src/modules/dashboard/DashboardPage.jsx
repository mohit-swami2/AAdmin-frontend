/**
 * DashboardPage — overview with live stats from the API.
 */
import { useEffect, useState } from 'react';
import {
  RiUserLine,
  RiShoppingBag3Line,
  RiMoneyDollarCircleLine,
  RiLineChartLine,
} from 'react-icons/ri';
import { PageWrapper } from '@/components/layout';
import StatCard from '@/components/charts/StatCard';
import DonutChart from '@/components/charts/DonutChart';
import { useAuth } from '@/hooks/useAuth';
import { getDashboardOverview } from './dashboardService';
import { formatCurrency } from '@/utils/formatCurrency';
import styles from './dashboard.module.css';

const DashboardPage = () => {
  const { user } = useAuth();
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await getDashboardOverview();
        if (mounted) setOverview(res.data);
      } catch {
        if (mounted) setOverview(null);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const stats = overview?.stats;
  const revenueData = overview?.revenueByCategory?.length
    ? overview.revenueByCategory
    : [{ name: 'No data', value: 1 }];
  const transactions = overview?.recentTransactions ?? [];

  return (
    <PageWrapper
      title={`Welcome, ${user?.name || 'AAdmin'} 👋`}
      breadcrumb="Home / Dashboard"
    >
      <div className={styles.statsGrid}>
        <StatCard
          title="Total Users"
          value={loading ? '…' : String(stats?.totalUsers ?? 0)}
          icon={RiUserLine}
          color="purple"
          trend={stats ? `${stats.activeUsers} active` : ''}
        />
        <StatCard
          title="Total Products"
          value={loading ? '…' : String(stats?.totalProducts ?? 0)}
          icon={RiShoppingBag3Line}
          color="green"
          trend="Live from database"
        />
        <StatCard
          title="Inventory Value"
          value={loading ? '…' : formatCurrency(stats?.revenue ?? 0)}
          icon={RiMoneyDollarCircleLine}
          color="blue"
          trend="price × stock"
        />
        <StatCard
          title="Active Users"
          value={loading ? '…' : String(stats?.activeUsers ?? 0)}
          icon={RiLineChartLine}
          color="orange"
          trend="of total users"
        />
      </div>

      <div className={styles.chartsRow}>
        <DonutChart data={revenueData} title="Inventory by Category" />
        <div className={styles.transactions}>
          <h3 className={styles.sectionTitle}>Recent Products</h3>
          <ul className={styles.transactionList}>
            {transactions.length === 0 && !loading && (
              <li className={styles.transactionItem}>No products yet</li>
            )}
            {transactions.map((tx) => (
              <li key={tx.id} className={styles.transactionItem}>
                <div>
                  <p className={styles.txName}>{tx.name}</p>
                  <p className={styles.txStatus}>{tx.status}</p>
                </div>
                <span className={styles.txAmount}>{tx.amount}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PageWrapper>
  );
};

export default DashboardPage;
