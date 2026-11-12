import { OamUiStatCard } from "oamui";
import { useDashboard } from "../api/hook";
import { STATS } from "../utils/stats";

export const StatGrid = () => {
  const { data } = useDashboard();
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {STATS.map(({ key, label, icon: Icon }) => (
        <OamUiStatCard key={key} label={label} value={data[key]} icon={<Icon />} />
      ))}
    </div>
  );
};
