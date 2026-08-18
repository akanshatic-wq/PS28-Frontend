import DashboardLayout from "./layouts/DashboardLayout";
import Overview from "./pages/Overview";

export default function App() {
  return (
    <DashboardLayout>
      <Overview />
    </DashboardLayout>
  );
}