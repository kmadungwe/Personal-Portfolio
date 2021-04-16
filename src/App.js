import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import PDF from './images/Resume(03-25-2021).pdf';
import axios from 'axios';

function App() {
  return (
    <div className='App'>
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
              <NavLink to={PDF} target='_blank'>
                resume
              </NavLink>{' '}
              and{' '}
              <NavLink to='/my-work' className='btn-black btnSmall btn'>
                projects.
              </NavLink>{' '}
              <a href='mailto:katelynn.clark333@gmail.com'>Email me</a> if I can
              help you with anything!
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
                href='mailto:katelynn.clark333@gmail.com'
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

class MyWork extends Component {
  constructor() {
    super();

    this.state = {
      pageTitle: 'Welcome to my portfolio',
      isLoading: false,
      data: [],
    };
    this.handleFilter = this.handleFilter.bind(this);
  }

  handleFilter(filter) {
    if (filter === 'CLEAR_FILTERS') {
      this.getPortfolioItems();
    } else {
      this.getPortfolioItems(filter);
    }
  }

  getPortfolioItems(filter = null) {
    axios
      .get('https://kateyclark.devcamp.space/portfolio/portfolio_items')
      .then((response) => {
        if (filter) {
          this.setState({
            data: response.data.portfolio_items.filter((item) => {
              return item.category === filter;
            }),
          });
        } else {
          this.setState({
            data: response.data.portfolio_items,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  portfolioItems() {
    return this.state.data.map((item) => {
      return <PortfolioItem key={item.id} item={item} />;
    });
  }

  componentDidMount() {
    this.getPortfolioItems();
  }

  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }
    return (
      <div className='my-work'>
        <div className='mainContentBlock'>
          <div className='pageHeader'>
            <div className='pageHeaderContainer ourWorkLogo'>
              <h1 className='pageHeaderTitle'>Projects</h1>
              <div className='pageHeaderSubtitle'>A few of my projects</div>
            </div>
            <div className='ourWorkProjects izContainer'>
              <div className='portfolio-items-wrapper'>
                {this.portfolioItems()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class PortfolioItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolioItemClass: '',
    };
  }

  handleMouseEnter() {
    this.setState({ portfolioItemClass: 'image-blur' });
  }

  handMouseLeave() {
    this.setState({ portfolioItemClass: '' });
  }
  render() {
    const { name, description, thumb_image_url, url } = this.props.item;

    return (
      <a
        href={url}
        target='_blank'
        rel='noreferrer'
        className='projects-wrapper'
      >
        <div
          className='portfolio-item-wrapper'
          onMouseEnter={() => this.handleMouseEnter()}
          onMouseLeave={() => this.handMouseLeave()}
        >
          <div
            className={
              'portfolio-img-background ' + this.state.portfolioItemClass
            }
            style={{
              backgroundImage: 'url(' + thumb_image_url + ')',
            }}
          />

          <div className='img-text-wrapper'>
            Click here to visit {name} code
          </div>
          <div className='descriptiveWords'>
            <div className='subtitle pageHeaderSubtitle upperTitle'>{name}</div>
            <div className='subtitle pageHeaderSubtitle tileDescription'>
              {description}
            </div>
          </div>
        </div>
      </a>
    );
  }
}
