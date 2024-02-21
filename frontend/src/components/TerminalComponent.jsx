import Terminal, {ColorMode} from 'react-terminal-ui'

function TerminalComponent() {
  return (
    <div className='h-full'>
      <Terminal name ='CodeBarcha Terminal' colorMode={ColorMode.Dark} height={129}>

      </Terminal>
    </div>
  )
}

export default TerminalComponent