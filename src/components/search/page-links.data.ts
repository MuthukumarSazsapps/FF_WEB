import { routes } from 'config/routes';
import { DUMMY_ID } from 'config/constants';

// Note: do not add href in the label object, it is rendering as label
export const pageLinks = [
  // label start
  {
    name: 'Loan',
  },
  // label end
  {
    name: 'Create Loan',
    href: 'loan/create',
  },
  {
    name: 'Loans List',
    href: '/list/loans',
  },
  {
    name: 'Loans Preclose',
    href: '/loan/preclose',
  },
  {
    name: 'Loans List',
    href: '/list/loans',
  },
  {
    name: 'Customer',
  },
  {
    name: 'Create Customer',
    href: '/customer/create',
  },
  {
    name: 'Customers List',
    href: '/list/customers',
  },
  {
    name: 'Outstanding Customers',
    href: '/customer/outstanding',
  },
  // label start
  {
    name: 'Reports',
  },
  // label end
  {
    name: 'OverDue Report',
    href: '/report/pending',
  },
  {
    name: 'Customet Statement',
    href: '/customer/report',
  },
  {
    name: 'Pending Documents',
    href: '/report/documents',
  },

  // {
  //   name: 'Edit Product',
  //   href: routes.eCommerce.ediProduct(DUMMY_ID),
  // },
  // {
  //   name: 'Categories',
  //   href: routes.eCommerce.categories,
  // },
  // {
  //   name: 'Create Category',
  //   href: routes.eCommerce.createCategory,
  // },
  // {
  //   name: 'Edit Category',
  //   href: routes.eCommerce.editCategory(DUMMY_ID),
  // },
  // {
  //   name: 'Orders',
  //   href: routes.eCommerce.orders,
  // },
  // {
  //   name: 'Order Details',
  //   href: routes.eCommerce.orderDetails(DUMMY_ID),
  // },
  // {
  //   name: 'Create Order',
  //   href: routes.eCommerce.createOrder,
  // },
  // {
  //   name: 'Edit Order',
  //   href: routes.eCommerce.editOrder(DUMMY_ID),
  // },
  // {
  //   name: 'Reviews',
  //   href: routes.eCommerce.reviews,
  // },
  // {
  //   name: 'Shop',
  //   href: routes.eCommerce.shop,
  // },
  // {
  //   name: 'Cart',
  //   href: routes.eCommerce.cart,
  // },
  // {
  //   name: 'Checkout & Payment',
  //   href: routes.eCommerce.checkout,
  // },
  // {
  //   name: 'Support Inbox',
  //   href: routes.support.inbox,
  // },
  // {
  //   name: 'Support Snippets',
  //   href: routes.support.snippets,
  // },
  // {
  //   name: 'Support Templates',
  //   href: routes.support.templates,
  // },
  // {
  //   name: 'Invoice List',
  //   href: routes.invoice.home,
  // },
  // {
  //   name: 'Invoice Details',
  //   href: routes.invoice.details(DUMMY_ID),
  // },
  // {
  //   name: 'Create Invoice',
  //   href: routes.invoice.create,
  // },
  // {
  //   name: 'Edit Invoice',
  //   href: routes.invoice.edit(DUMMY_ID),
  // },
  // {
  //   name: 'Shipment List',
  //   href: routes.logistics.shipmentList,
  // },
  // {
  //   name: 'Shipment Details',
  //   href: routes.logistics.shipmentDetails(DUMMY_ID),
  // },
  // {
  //   name: 'Tracking',
  //   href: routes.logistics.tracking(DUMMY_ID),
  // },
  // {
  //   name: 'File Manager',
  //   href: routes.file.manager,
  // },
  // // label start
  // {
  //   name: 'Widgets',
  // },
  // // label end
  // {
  //   name: 'Cards',
  //   href: routes.widgets.cards,
  // },
  // {
  //   name: 'Icons',
  //   href: routes.widgets.icons,
  // },
  // {
  //   name: 'Charts',
  //   href: routes.widgets.charts,
  // },
  // // {
  // //   name: 'Banners',
  // //   href: routes.widgets.banners,
  // // },
  // {
  //   name: 'Maps',
  //   href: routes.widgets.maps,
  // },
  // // label start
  // {
  //   name: 'Forms',
  // },
  // // label end
  // {
  //   name: 'Add Subscriber',
  //   href: routes.forms.addSubscriber,
  // },
  // {
  //   name: 'Notification Preference',
  //   href: routes.forms.notificationPreference,
  // },
  // {
  //   name: 'Personal Information',
  //   href: routes.forms.personalInformation,
  // },
  // {
  //   name: 'Newsletter',
  //   href: routes.forms.newsletter,
  // },
  // // {
  // //   name: 'Multi Step',
  // //   href: routes.forms.multiStep,
  // // },
  // {
  //   name: 'Payment checkout',
  //   href: routes.eCommerce.checkout,
  // },
  // // label start
  // {
  //   name: 'Tables',
  // },
  // // label end
  // {
  //   name: 'Basic',
  //   href: routes.tables.basic,
  // },
  // {
  //   name: 'Collapsible',
  //   href: routes.tables.collapsible,
  // },
  // {
  //   name: 'Enhanced',
  //   href: routes.tables.enhanced,
  // },
  // {
  //   name: 'Sticky Header',
  //   href: routes.tables.stickyHeader,
  // },
  // {
  //   name: 'Pagination',
  //   href: routes.tables.pagination,
  // },
  // {
  //   name: 'Search',
  //   href: routes.tables.search,
  // },
  // // label start
  // {
  //   name: 'Pages',
  // },
  // // label end
  // {
  //   name: 'Profile',
  //   href: routes.profile,
  // },
  // {
  //   name: 'Welcome',
  //   href: routes.welcome,
  // },
  // {
  //   name: 'Coming soon',
  //   href: routes.comingSoon,
  // },
  // {
  //   name: 'Access Denied',
  //   href: routes.accessDenied,
  // },
  // {
  //   name: 'Not Found',
  //   href: routes.notFound,
  // },
  // {
  //   name: 'Maintenance',
  //   href: routes.maintenance,
  // },
  // {
  //   name: 'Blank',
  //   href: routes.blank,
  // },
  // // label start
  // {
  //   name: 'Authentication',
  // },
  // // label end
  // {
  //   name: 'Modern Sign Up',
  //   href: routes.auth.signUp1,
  // },
  // {
  //   name: 'Vintage Sign Up',
  //   href: routes.auth.signUp2,
  // },
  // {
  //   name: 'Trendy Sign Up',
  //   href: routes.auth.signUp3,
  // },
  // {
  //   name: 'Elegant Sign Up',
  //   href: routes.auth.signUp4,
  // },
  // {
  //   name: 'Classic Sign Up',
  //   href: routes.auth.signUp5,
  // },
  // {
  //   name: 'Modern Sign In',
  //   href: routes.auth.signIn1,
  // },
  // {
  //   name: 'Vintage Sign In',
  //   href: routes.auth.signIn2,
  // },
  // {
  //   name: 'Trendy Sign In',
  //   href: routes.auth.signIn3,
  // },
  // {
  //   name: 'Elegant Sign In',
  //   href: routes.auth.signIn4,
  // },
  // {
  //   name: 'Classic Sign In',
  //   href: routes.auth.signIn5,
  // },
  // {
  //   name: 'Modern Forgot Password',
  //   href: routes.auth.forgotPassword1,
  // },
  // {
  //   name: 'Vintage Forgot Password',
  //   href: routes.auth.forgotPassword2,
  // },
  // {
  //   name: 'Trendy Forgot Password',
  //   href: routes.auth.forgotPassword3,
  // },
  // {
  //   name: 'Elegant Forgot Password',
  //   href: routes.auth.forgotPassword4,
  // },
  // {
  //   name: 'Classic Forgot Password',
  //   href: routes.auth.forgotPassword5,
  // },
  // {
  //   name: 'Modern OTP Page',
  //   href: routes.auth.otp1,
  // },
  // {
  //   name: 'Vintage OTP Page',
  //   href: routes.auth.otp2,
  // },
  // {
  //   name: 'Trendy OTP Page',
  //   href: routes.auth.otp3,
  // },
  // {
  //   name: 'Elegant OTP Page',
  //   href: routes.auth.otp4,
  // },
  // {
  //   name: 'Classic OTP Page',
  //   href: routes.auth.otp5,
  // },
];
