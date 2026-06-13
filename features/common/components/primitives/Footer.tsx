import Link from 'next/link'
import Image from "next/image"

type CategoriesType = {
  label: string,
  href: string
}

type FooterNavType = {
  title: string
  categories: CategoriesType[]
}

const FOOTER_NAV: FooterNavType[] = [
  {
    title: "explore",
    categories: [
      {
        label: "Project",
        href: "/"
      },
      {
        label: "team",
        href: "/team"
      },
      {
        label: "results",
        href: "/result"
      }
    ]
  },
  {
    title: "contact",
    categories: [
      {
        label: "(+995 32) 222 00 09",
        href: "tel:+995322220009"
      },
      {
        label: "info@iliauni.edu.ge",
        href: "mailto:info@iliauni.edu.ge"
      }
    ]
  }
]


const Footer = () => {
  return (
    <footer className='bg-[#535353] w-full  px-6
      pt-6
      md:px-8
      md:pt-8
      xl:pt-5
      xl:px-20'>
      <div className='max-w-7xl mx-auto pt-5 pb-3 '>
        <div className='flex justify-between pb-3.5 md:pb-11 xl:pb-16'>
          <Link href={'/'}>
            <Image width={100} height={100} src={'/images/logo/logo_light.svg'} alt="Website logo" className="w-18 h-18 md:w-25 md:h-25 xl:w-30 xl:h-30" />
          </Link>

          <ul className='flex gap-10 capitalize xl:gap-45'>
            {
              FOOTER_NAV.map(item => (
                <li key={item.title} className='text-[12px] leading-5  font-bold text-[#FFFFFF] md:text-[16px] md:leading-6 xl:text-[20px] '>
                  {item.title}

                  <ul className='flex flex-col gap-2 pt-3'>
                    {
                      item.categories.map(category => (
                        <li key={category.label} className='font-normal normal-case text-[12px] md:text-[16px] md:leading-5 leading-4 xl:text-[18px]'>
                          <Link href={category}>
                            {category.label}
                          </Link>
                        </li>
                      ))
                    }
                  </ul>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
      <div className=' h-0.5 md:h-1 bg-[#6B6B6B52] -mx-6 md:-mx-8 xl:-mx-20' />
      <div className='max-w-7xl mx-auto  pb-3 md:pb-5  '>
        <div className='flex flex-col-reverse md:flex-row md:justify-between md:text-[14px] md:leading-5 items-center gap-2 pt-3 md:pt-5  text-[12px] leading-4 text-[#FFFFFF99]'>
          <p className='text-nowrap'>
            &copy; {new Date().getFullYear()} The Architecture and Urban Studies Laboratory
          </p>
          <div className='flex items-center gap-4 md:gap-7'>
            <Link href={'/'}>
              Privacy
            </Link>
            <Link href={'/'}>
              Cookies
            </Link>
            <Link href={'/'}>
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
