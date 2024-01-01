import DashboardItem from "@/components/dashbard-item";
import { getById } from "@/lib/api";
import { Music } from "@/lib/types";

const page = ({ params }: { params: { id: string } }) => {
  const data: Music = getById(Number(params.id));
  return <DashboardItem data={data} />;
};

export default page;
