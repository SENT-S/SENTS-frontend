import CompanyPage from '@/components/pages/company';

export default function page({ params }: { params: { companyId: string } }) {
  return <CompanyPage params={params} />;
}
