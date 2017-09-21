import React from 'react';
import './NewsPage.css';

class Event extends React.Component {
    render () {
        return (
          <div className="col-sm-12 news-page-event">
              <hr/>
              <div className="col-wd-1 col-md-2 col-sm-3 news-page-event-date">{this.props.date}</div>
              <div className="col-wd-1 col-md-2 col-sm-3 news-page-event-title">{this.props.title}</div>
              <div className="col-wd-10 col-md-8 col-sm-6 news-page-event-description">{this.props.description}</div>

          </div>
        );
    }
}

let EVENTS = [
    {id:1, date:"10.08.2017", title:"Milonga Blanco", description:"..."},
    {id:2, date:"15.08.2017", title:"Milonga Ghironda Ice-dj Willow", description:"Il 6 maggio l'hotel Sporting di Trento ha ospitato l'assemblea\
        2017 di FAItango, un'occasione per i nostri soci di incontrare\
        i vertici della Federazione e di riflettere sugli obiettivi\
    futuri, oltre a offrire un'opportunità di dialogo a tutte le\
    associazioni affiliate che sono intervenute."
    },
    {id:3, date:"16.08.2017", title:"Milonga del Corazón", description:"Come ogni anno ritorna immancabile la milonga più amata e\
        fresca...il martedì tanguero di Bologna...l'estate ormai è\
    alle porte...state pronti...si balla!!!"
    },
    {id:4, date:"17.08.2017", title:"Milonga en blanco!", description:"Pranzo di Ferragosto in compagnia del Tango per chitarra di\
        Astor Piazzolla. Presso il Salone Piacentini, all'interno del\
        Grand Hotel diCastrocaro Terme"
    }
];

class NewsPage extends React.Component {
    render () {
        let events = [];
        EVENTS.forEach((event) => {
            events.push(
                <Event key={event.id} date={event.date} title={event.title} description={event.description}/>
            );
        });

        return (
            <div>
                <h2>News</h2>
                {events}
            </div>
        );
    }
}

export default NewsPage;