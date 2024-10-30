enum MODE {
  DARK = 'dark',
  LIGHT = 'light',
}

export const siteConfig = {
  title: 'Sazs Apps',
  description: `Welcome to Sazs Apps`,
  logo: '../images/sazslogo.jpg', // Replace with the actual path to your logo image
  icon: '../images/sazslogo.jpg', // Replace with the actual path to your logo icon
  mode: MODE.LIGHT,
  layout: 'your-layout-option', // Replace with your actual layout option
  TODO: '../images/sazslogo.jpg',
};

export const metaObject = (
  title?: string,
  openGraph?: () => {},
  description: string = siteConfig.description,
) => {
  return {
    title: title ? `${title} - Sazs Apps` : siteConfig.title,
    description,
    openGraph: openGraph ?? {
      title: title ? `${title} - Sazs Apps` : title,
      description,
      url: 'https://sazs-finance-app.vercel.app/login',
      siteName: 'Sazs Apps',
      images: {
        // url: 'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/itemdep/isobanner.png',
        width: 1200,
        height: 630,
      },
      locale: 'en_US',
      type: 'website',
    },
  };
};
