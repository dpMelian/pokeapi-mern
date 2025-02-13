interface Props {
  name: string
  icon: string
  statValue: number
}

const Stat = ({ name, statValue }: Props): JSX.Element => (
  <div className="flex w-3/4 items-center justify-between">
    <div className="flex items-center">{name.toUpperCase()}</div>
    <div>{statValue}</div>
  </div>
)

export default Stat
