import useUsers from 'hooks/use-users';
import React from 'react';
import { Text } from 'rizzui';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  iconOnly?: boolean;
}

export default function Logo({ iconOnly = false, ...props }: IconProps) {
  const { loginUser } = useUsers();
  const avatarUrl = loginUser?.Logo
    ? `http://localhost:5000/subscriber/${loginUser.Logo}`
    : require('../images/sazslogo.jpg');
  return (
    <div className="flex flex-row space-x-4 justify-center items-center">
      <img className="rounded-lg" src={avatarUrl} width={45} />
      {!iconOnly && (
        <div>
          <h4>Sazs Apps</h4>
          <Text className="font-medium text-xs">
            {loginUser.CompanyName ? loginUser?.CompanyName : 'Sazs Finance Software'}
          </Text>
        </div>
      )}
    </div>
  );
}
