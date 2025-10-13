import './MenuCard.scss'

const NavHeaderCard = ({ title }: { title: string }) => {
  return (
    <div className="menu-card">
      <h3>{title}</h3>
    </div>
  )
}

export default NavHeaderCard