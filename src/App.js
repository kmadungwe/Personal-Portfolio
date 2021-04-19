import './App.css';
import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import PDF from './images/Resume(04-19-2021).pdf';
import axios from 'axios';

function App() {
  return (
    <div className='App'>
      <Suspense>
        <Router>
          <div>
            <NavigationBar />
            <Switch>
              <Route exact path='/' component={HomePageTitle} />
              <Route path='/my-resume' />
              <Route path='/my-work' component={MyWork} />
              <Route path='/contact' />
              {/* <Route component={NoMatch} /> */}
            </Switch>
          </div>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;

const HomePageTitle = () => {
  return (
    <div>
      <div className='homePageTitle'>
        <div className='homePageTitleContainer'>
          <div className='homePageTitleBackground'>
            <div className='homePageTitleBackgroundBR' />
          </div>
          <div className='word-container'>
            <div className='hPTitleLeft'>
              After taking a self-reliance course, interviewing developers, and
              researching what it's truly like to be a developer, I realized
              that becoming a developer is the best career choice for me. I
              discovered that creating the logic for a website and then being
              able to see how it turns out is one of my favorite things to do! I
              love the challenge of development and that it pushes me to
              understand and create more just from pure curiosity. Due to the
              natural behavior I have of curiosity and understanding logic
              pushes me to be become the best developer I can be, bringing me
              personal and professional fulfillment. I am currently seeking a
              position as a Front End Software React Developer where I can grow
              to provide accomplishment to both myself and a company, using
              tools I know such as React, ES6, HTML, CSS, and more.
              Additionally, I participate weekly in multiple classes that assist
              me in becoming the developer I want to be. Please feel free to
              checkout my{' '}
              <NavLink
                to={PDF}
                target='_blank'
                rel='noreferrer'
                className='homePageLinks'
              >
                resume
              </NavLink>{' '}
              and{' '}
              <NavLink to='/my-work' className='homePageLinks'>
                projects.
              </NavLink>{' '}
              <a
                href='mailto:katelynn.clark333@gmail.com?Subject=Hi Katey! Portfolio Website Inquiry'
                className='homePageLinks'
              >
                Email me
              </a>{' '}
              if I can help you with anything!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NavigationBar = () => {
  return (
    <div className='App'>
      <div className='navBar'>
        <div className='navFlexContainer izContainer'>
          <div className='navRight'>
            <div className='navLeft'>
              <NavLink exact to='/'>
                <div alt='Nickname: Katey' className='navLogo'>
                  KATELYNN!
                </div>
              </NavLink>
            </div>
            <div className='navRightWords'>
              <NavLink to={PDF} target='_blank' className='navLink'>
                resume
              </NavLink>

              <NavLink to='/my-work' className='navLink'>
                work
              </NavLink>

              <a
                className='btn-orange btnSmall btn'
                href='mailto:katelynn.clark333@gmail.com?Subject=Hi Katey! Portfolio Website Inquiry'
              >
                contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function MyWork() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('https://kateyclark.devcamp.space/portfolio/portfolio_items')
      .then((response) => {
        setData(response.data.portfolio_items);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setData]);

  function portfolioItems() {
    return data.map((item) => {
      return <PortfolioItem key={item.id} item={item} />;
    });
  }

  return (
    <div className='my-work'>
      <div className='mainContentBlock'>
        <div className='pageHeader'>
          <div className='pageHeaderContainer ourWorkLogo'>
            <h1 className='pageHeaderTitle'>Projects</h1>
            <div className='pageHeaderSubtitle'>
              Over the past two years I have dedicated much of my time to
              developing. Here are some of the most recent developments I have
              created. They mainly focus on React, JavaScript, CSS, and JSX. If
              you would prefer to just checkout my GitHub, click{' '}
              <a
                href='https://github.com/kmadungwe'
                target='_blank'
                className='githubLinkStyle'
                rel='noreferrer'
              >
                here
              </a>{' '}
              for a link to my profile.
            </div>
          </div>
          <div className='ourWorkProjects izContainer'>
            <div className='portfolio-items-wrapper'>{portfolioItems()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const PortfolioItem = (props) => {
  const [portfolioItemClass, setPortfolioItemClass] = useState('');
  const { name, description, thumb_image_url, url } = props.item;

  function handleMouseEnter() {
    setPortfolioItemClass({ portfolioItemClass: 'image-blur' });
  }

  function handMouseLeave() {
    setPortfolioItemClass({ portfolioItemClass: '' });
  }

  return (
    <a href={url} target='_blank' rel='noreferrer' className='projects-wrapper'>
      <div
        className='portfolio-item-wrapper'
        onMouseEnter={() => handleMouseEnter()}
        onMouseLeave={() => handMouseLeave()}
      >
        <div
          className={'portfolio-img-background ' + portfolioItemClass}
          style={{
            backgroundImage: 'url(' + thumb_image_url + ')',
          }}
        />

        <div className='img-text-wrapper'>Click here to visit {name} code</div>
        <div className='descriptiveWords'>
          <div className='subtitle  upperTitle'>{name}</div>
          <div className='subtitle  tileDescription'>{description}</div>
        </div>
      </div>
    </a>
  );
};
