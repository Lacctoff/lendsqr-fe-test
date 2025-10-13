import './MenuCard.scss'

const TitleHeader = ({ title }: { title: string }) => {
  return (
    <div className="title-header">
      <h3>{title}</h3>
    </div>
  )
}

export default TitleHeader