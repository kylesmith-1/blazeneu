import { Row, Col, Button, Container } from 'react-bootstrap';
import snoop from './Gifs/snoop_dogg.gif';
import justin from './Gifs/justin_timberlake.gif';
import ted from './Gifs/ted.gif';
import elon from './Gifs/elon.gif';
import that_70s from './Gifs/that_70s.gif';

function display_gif({company}) {
    let b = true;
    let count = 0;
    function determine(cur_entry) {
        count += 1;
        if (cur_entry.drug_test) {
            b = false;
        }
    }
    company.entries.map((entry) => (determine(entry)))

    function genRandomNumber(min, max) { 
        return Math.floor(Math.random() * (max - min) + min);
    }

    function select_random_gif() {
        let num = genRandomNumber(0, 5);
        if (num === 0) {
            return (<img src={snoop} alt="" />);
        }
        else if (num === 1) {
            return(
                <figure>
                    <img src={ted} alt="" />
                    <figcaption>Copyright Universal Pictures.</figcaption>
                </figure>
            );
        }
        else if (num === 2) {
            return (<img src={elon} alt="" />);
        }
        else if (num === 3) {
            return(
                <figure>
                    <img src={that_70s} alt="" />
                    <figcaption>Copyright Carsey-Werner Television.</figcaption>
                </figure>
            );
        }
        else {
            return(
            <figure>
                <img src={justin} alt="" />
                <figcaption>Copyright Sony Pictues Enterntainment.</figcaption>
            </figure>
            );
        }

    }

    if (b && count > 0) {
        return (
            <Row>
                <Col>
                <h6>Woohoo! This company has been reported in <b>100%</b> of entries to <b>not drug test!</b></h6>
                {select_random_gif()}
                </Col>
            </Row>
            );
    }
    else {
        return(<Row></Row>);
    }
} 
export default display_gif;