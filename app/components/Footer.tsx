import Link from 'next/link'
import Image from "next/image"
import { ul } from 'motion/react-client'

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
        href: "/"
      },
      {
        label: "results",
        href: "/"
      }
    ]
  },
  {
    title: "contact",
    categories: [
      {
        label: "(+995 32) 222 00 09",
        href: "tel:(+995 32) 222 00 09"
      },
      {
        label: "info@iliauni.edu.ge",
        href: "mailto:info@iliauni.edu.ge"
      }
    ]
  }
]


const  Footer = () => {
  return (
    <footer className='bg-[#535353] w-full'>
      <div className='max-w-7xl mx-auto   pt-5 px-6  pb-3 '>
        <div className='flex justify-between pb-3.5 md:pb-11 lg:pb-16'>
          <Link href={'/'}>
            <Image width={100} height={100} src={'/images/logo/logo_light.svg'} alt="Website logo" className="w-18 h-18 md:w-25 md:h-25 lg:w-20 lg:h-20" />
          </Link>

        <ul className='flex gap-10 capitalize lg:gap-45'>
          {
            FOOTER_NAV.map(item => (
              <li key={item.title} className='text-[12px] leading-5  font-bold text-[#FFFFFF] md:text-[16px] md:leading-6 lg:text-[20px] '>
                {item.title}

                <ul className='flex flex-col gap-2 pt-3'>
                  {
                    item.categories.map(item => (
                      <li key={item.label} className='font-normal text-[12px] md:text-[16px] md:leading-5 leading-4 lg:text-[18px]'>
                        <Link href={item.href}>
                          {item.label}
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
      <div className='w-full h-0.5 md:h-1 bg-[#6B6B6B52]' />
      <div className='max-w-7xl mx-auto  px-6  pb-3 '>
        <div className='flex flex-col-reverse md:flex-row md:justify-between md:text-[14px] md:leading-5 items-center gap-2 pt-3 md:pt-5 border-t border-[#6B6B6B52] text-[12px] leading-4 text-[#FFFFFF99]'>
          <p>
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
