import React, { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface AuthSectionProps {
  user: any;
  signOut: () => void;
}

const UserDropdown = memo(({ user, signOut }: AuthSectionProps) => {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-10 px-3 flex items-center space-x-2 hover:bg-gray-100 text-gray-700 hover:text-black"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user.user_metadata?.avatar_url}
              alt={user.user_metadata?.full_name}
            />
            <AvatarFallback className="bg-gradient-to-br from-cyan-100 to-slate-100 text-slate-700">
              {user.user_metadata?.full_name?.charAt(0) ||
                user.email?.charAt(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-gray-700">
            {user.user_metadata?.full_name || "Account"}
          </span>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 bg-white border border-slate-200 shadow-xl"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none text-slate-900">
              {user.user_metadata?.full_name}
            </p>
            <p className="text-xs leading-none text-slate-500">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => navigate("/dashboard")}
          className="cursor-pointer hover:bg-slate-50 transition-colors duration-150"
        >
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => navigate("/profile")}
          className="cursor-pointer hover:bg-slate-50 transition-colors duration-150"
        >
          Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => signOut()}
          className="cursor-pointer text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-150"
        >
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

UserDropdown.displayName = "UserDropdown";

const AuthButtons = memo(() => (
  <div className="flex items-center space-x-3">
    <Link to="/auth">
      <Button
        variant="ghost"
        className="text-gray-700 hover:text-black hover:bg-gray-100"
      >
        Sign In
      </Button>
    </Link>
    <Link to="/auth">
      <Button className="bg-black hover:bg-gray-800 text-white px-6 shadow-sm">
        Get Started
      </Button>
    </Link>
  </div>
));

AuthButtons.displayName = "AuthButtons";

export const DesktopAuthSection = memo(
  ({ user, signOut }: { user: any; signOut: () => void }) => (
    <div className="hidden md:flex items-center space-x-4">
      {user ? <UserDropdown user={user} signOut={signOut} /> : <AuthButtons />}
    </div>
  ),
);

DesktopAuthSection.displayName = "DesktopAuthSection";

export const MobileAuthSection = memo(
  ({
    user,
    signOut,
    onClose,
  }: {
    user: any;
    signOut: () => void;
    onClose: () => void;
  }) => {
    const handleSignOut = () => {
      signOut();
      onClose();
    };

    return (
      <>
        {user ? (
          <Button
            variant="ghost"
            className="justify-start text-red-600 hover:text-red-700 hover:bg-red-50 mx-4"
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        ) : (
          <div className="flex flex-col space-y-3 px-4 pt-2">
            <Link to="/auth" onClick={onClose}>
              <Button
                variant="outline"
                className="w-full border-slate-400 text-slate-300 hover:bg-slate-600"
              >
                Sign In
              </Button>
            </Link>
            <Link to="/auth" onClick={onClose}>
              <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                Get Started
              </Button>
            </Link>
          </div>
        )}
      </>
    );
  },
);

MobileAuthSection.displayName = "MobileAuthSection";
