import React from 'react'
interface Props {
  links: Array<string>
}
const FooterColumn = ({ links }: Props) => {
  return (
    <div>
      {links.map((link) => (
        <p className="py-2">
          <a
            key={link}
            href="#"
            className="text-sm text-[grey] hover:underline"
          >
            {link}
          </a>
        </p>
      ))}
    </div>
  )
}

export default FooterColumn
