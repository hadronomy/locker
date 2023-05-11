import { buttonVariants } from '~/components/ui/Button';
import { Input } from '~/components/ui/Input';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel
} from '~/components/ui/AlertDialog';
import { cn } from '~/lib/utils';
import { Label } from '~/components/ui/Label';
import LockCard from '~/components/ui/LockCard';

export const metadata = {
  title: 'Locker - Panel'
};

type Lock = {
  name: string;
  description: string;
  status: 'Locked' | 'Unlocked';
};

const locks = [
  {
    name: 'Kitchen',
    description: 'Lorem ipsum',
    status: 'Locked'
  },
  {
    name: 'Bedroom',
    description: 'Lorem ipsum',
    status: 'Unlocked'
  },
  {
    name: 'Livingroom',
    description: 'Lorem ipsum',
    status: 'Locked'
  }
] satisfies Lock[];

export default function PanelPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-screen-xl flex-col px-5 md:px-10">
      <div className="mt-10 flex gap-x-3">
        <Input placeholder="Search..." accept="text" disabled />
        <AlertDialog>
          <AlertDialogTrigger
            className={`${cn(
              buttonVariants(),
              'w-40 font-extrabold tracking-tighter'
            )}`}
          >
            Add New
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Add a New Lock</AlertDialogTitle>
              <AlertDialogDescription>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input type="name" id="name" placeholder="Lock Name" />
                </div>
                <div className="mt-4 grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    type="description"
                    id="description"
                    placeholder="Description"
                  />
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="flex flex-col py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {locks.map((lock) => (
            <LockCard
              key={lock.name}
              name={lock.name}
              description={lock.description}
              status={lock.status}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
