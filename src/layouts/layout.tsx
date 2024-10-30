import { routes } from 'config/routes';
import PageHeader from 'common/table & form/page-header';
import ProfileSettingsNav from 'layouts/navigation';

const pageHeader = {
  title: 'Profile',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      href: routes.forms.addSubscriber,
      name: 'Profile',
    },
  ],
};

export default function ProfileLayout() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ProfileSettingsNav />
    </>
  );
}
