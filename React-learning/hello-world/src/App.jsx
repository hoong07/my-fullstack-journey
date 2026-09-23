import { NameList } from './NameList'
import { Alert } from './Alert'
import { NewButton } from './NewButton'
import { CustomButton } from './CustomButton'
import './App.css'
function App() {
  return (
  <div>
    <CustomButton text="Like"/>
    <CustomButton text="Buttom"/>
    <Alert>your changes have been saved!</Alert>
    <Alert type='error'>your changes have been saved!</Alert>
    <NewButton />
    <NameList />
    </div>
  )
}

export default App
