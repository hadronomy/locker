import * as React from 'react';

const DEBUG = false;

export type RSCVisualizerProps = React.ComponentProps<'div'> & {
  name: string;
  rsc?: boolean;
};

export function RSCVisualizer({ children, name, rsc }: RSCVisualizerProps) {
  if (!DEBUG) {
    return <>{children}</>;
  }

  return (
    <div
      className={`mt-2 border-8 ${
        rsc ? 'border-blue-800' : 'border-red-800'
      } rounded-lg`}
    >
      <div
        className={`flex rounded-t-sm text-2xl ${
          rsc ? 'bg-blue-100' : 'bg-red-100'
        } font-bold`}
      >
        {rsc && <div className="bg-blue-800 px-4 py-2 text-white">RSC</div>}
        <div className="ml-2 py-2 text-black">{name}</div>
      </div>
      <div className="p-1">{children}</div>
    </div>
  );
}
