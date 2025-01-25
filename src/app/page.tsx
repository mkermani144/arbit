import { Suspense } from 'react';

import App from './App';
import AppLoading from './AppLoading';

import GithubRepo from '@/components/github-repo';
import { ModeToggle } from '@/components/mode-toggle';
import { Badge } from '@/components/ui/badge';

export const experimental_ppr = true;

export default async function Home() {
  return (
    <div className="flex h-screen w-full items-center justify-center flex-col px-4">
      <div className="fixed top-4 left-4">
        <div className="flex gap-2 items-center">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Arbit
          </h3>
          <Badge variant="outline">alpha</Badge>
        </div>
      </div>
      <div className="fixed top-4 right-4">
        <div className="flex gap-2">
          <ModeToggle />
          <GithubRepo />
        </div>
      </div>
      <Suspense fallback={<AppLoading />}>
        <App />
      </Suspense>
    </div>
  );
}
