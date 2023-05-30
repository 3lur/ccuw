export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 fixed left-0 right-0 bottom-0">
      <div className="w-full">
        <span className="block text-sm text-white p-3">
          © 2023{' '}
          <a href="https://github.com/3lur" className="hover:underline">
            3lur
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  )
}
