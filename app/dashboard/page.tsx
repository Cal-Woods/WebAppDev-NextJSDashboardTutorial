import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import { lusitana } from '@/app/ui/fonts';
import { fetchLatestInvoices, fetchRevenue, fetchCardData} from '../lib/data';
import LatestInvoices from '../ui/dashboard/latest-invoices';
import { Card} from '../ui/dashboard/cards';


export default async function Page() {
  const revenue = await fetchRevenue();
  const invoices = await fetchLatestInvoices();
  const cardData = await fetchCardData();

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <Card title='Number of customers' value={cardData.numberOfCustomers} type='customers'/>
      <Card title='Number of invoices' value={cardData.numberOfInvoices} type='invoices'/>
      <Card title='Total paid invoices' value={cardData.totalPaidInvoices} type='collected'/>
      <Card title='Total pending invoices' value={cardData.totalPendingInvoices} type='pending'/>



      <RevenueChart revenue={revenue}/>
      <LatestInvoices latestInvoices={invoices}/>
    </main>
  );
}