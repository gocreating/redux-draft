import Prism from 'prismjs';
import React, { Component } from 'react';
import classNames from 'classnames';
import 'prismjs/plugins/line-highlight/prism-line-highlight';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/keep-markup/prism-keep-markup';
import 'prismjs/themes/prism-solarizedlight.css';
import 'prismjs/plugins/line-highlight/prism-line-highlight.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import './CodeHighlight.css';

class CodeHighlight extends Component {
  componentDidMount() {
    this.hightlight();
  }

  // performance matters when we deal with prism
  shouldComponentUpdate(nextProps) {
    if (
      this.props.language !== nextProps.language ||
      this.props.value !== nextProps.value ||
      this.props.lineNumbers !== nextProps.lineNumbers ||
      this.props.lineHighlight !== nextProps.lineHighlight
    ) {
      return true;
    } else {
      return false;
    }
  }

  componentDidUpdate() {
    this.hightlight();
  }

  hightlight() {
    Prism.highlightElement(this.prismBlock);
  }

  render() {
    let {
      language,
      lineNumbers,
      lineHighlight,
      value,
    } = this.props;
    let cx = classNames(`language-${language}`, {
      'line-numbers': lineNumbers,
    });

    return (
      <div className="rd code-highlight">
        <pre
          className={cx}
          data-line={lineHighlight}
        >
          <code
            ref={prismBlock => { this.prismBlock = prismBlock; }}
          >{value}</code>
        </pre>
      </div>
    );
  }
}

export default CodeHighlight;
