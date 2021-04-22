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
              Hi, I'm Katey! Software development is something I was curious
              about for years, as it seemed like a challenging and rewarding
              line of work. After interviewing and working alongside
              professional developers, I realized that I wanted to pursue a
              career in software development. After making the decision to take
              the plunge into the world of software development, I discovered
              that solving the creative and logical challenges for a website is
              one of my favorite things to do! As someone who is curious by
              nature, I love that there is always more to learn and understand
              when creating software. As I've progressed in my learning and
              sharpen my skills as a developer, I've felt increasing personal
              and professional fulfillment. I currently participate in multiple
              weekly classes that are helping me become the developer I want to
              be. In addition to basic HTML, CSS, and JS, I've recently been
              working with modern JS (ES6+) and modern React, including Hooks. I
              am currently seeking a position as a Front End React Developer
              where I can grow my skills and become a strong contributor for my
              team Please feel free to checkout my{' '}
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
