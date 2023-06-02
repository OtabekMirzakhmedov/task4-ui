import React, {useState} from 'react'
import Card from 'react-bootstrap/Card';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import SignIn from './SignIn';
import SignUp from './SignUp';

const AuthPage = () => {

  const [activeTab, setActiveTab] = useState("SignIn");

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
  };

  const handleSignUpSuccess = () => {
    console.log('I ma in ahd');
    setActiveTab("SignIn");
  };


  return (
    <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <Card className='shadow col-sm-8 col-10 col-md-5 col-lg-3'>
        <Tabs
        activeKey={activeTab}
        onSelect={handleTabChange}
        id="fill-tab-example"
        className="mb-3"
        fill>
            <Tab eventKey="SignIn" title="Sign In">
                <SignIn />
            </Tab>
            <Tab eventKey="SignUp" title="Sign Up" >
                <SignUp onSignUpSuccess={handleSignUpSuccess}/>
            </Tab>
        </Tabs>
      </Card>
    </div>
  )
}

export default AuthPage
