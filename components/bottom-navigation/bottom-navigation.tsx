import { Button } from "@/components/ui/button";
import { Icon, IconName } from "@/components/ui/icon";

type BottomNavigationAction = {
  label: string;
  icon: IconName;
  onClick: () => void;
};

type BottomNavigationProps = {
  actions: BottomNavigationAction[];
};

const BottomNavigation: React.FC<BottomNavigationProps> = ({ actions }) => {
  return (
    <div className="bg-background flex justify-around items-center">
      {actions.map(({ label, icon, onClick }) => (
        <Button
          key={label}
          onClick={onClick}
          variant="ghost"
          className="flex flex-col h-fit gap-2 bg-background text-primary"
        >
          <Icon name={icon} size="28px" />
          <span className="font-semibold tracking-wider">{label}</span>
        </Button>
      ))}
    </div>
  );
};

export { BottomNavigation, type BottomNavigationAction };
