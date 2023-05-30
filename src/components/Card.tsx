import cover from '../assets/images/game-cover.jpg'

type Props = {
  resource: Game
}
export const Card: React.FC<Props> = ({ resource }) => {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-xl mr-3 mb-3">
      <img className="w-full" src={cover} alt={resource.name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{resource.name}</div>
        <div>参与人数：{resource.users.length}</div>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #photography
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #travel
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #winter
        </span>
        <button className="block mt-5 py-2 px-5 bg-indigo-700 rounded-lg text-white">
          进入
        </button>
      </div>
    </div>
  )
}
