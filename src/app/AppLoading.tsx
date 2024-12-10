import { Loader2 } from 'lucide-react';

const AppLoading = () => (
  <div className="flex items-center gap-2">
    <small className="text-sm font-medium leading-none">
      Computing Arbit profits
    </small>
    <Loader2 className="animate-spin" />
  </div>
);

export default AppLoading;
