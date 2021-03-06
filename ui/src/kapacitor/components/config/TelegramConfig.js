import React, {PropTypes} from 'react'
import QuestionMarkTooltip from 'src/shared/components/QuestionMarkTooltip'
import {TELEGRAM_CHAT_ID_TIP, TELEGRAM_TOKEN_TIP} from 'src/kapacitor/copy'

import RedactedInput from './RedactedInput'

const {bool, func, shape, string} = PropTypes

const TelegramConfig = React.createClass({
  propTypes: {
    config: shape({
      options: shape({
        'chat-id': string.isRequired,
        'disable-notification': bool.isRequired,
        'disable-web-page-preview': bool.isRequired,
        'parse-mode': string.isRequired,
        token: bool.isRequired,
      }).isRequired,
    }).isRequired,
    onSave: func.isRequired,
  },

  handleSaveAlert(e) {
    e.preventDefault()

    let parseMode
    if (this.parseModeHTML.checked) {
      parseMode = 'HTML'
    }
    if (this.parseModeMarkdown.checked) {
      parseMode = 'Markdown'
    }

    const properties = {
      'chat-id': this.chatID.value,
      'disable-notification': this.disableNotification.checked,
      'disable-web-page-preview': this.disableWebPagePreview.checked,
      'parse-mode': parseMode,
      token: this.token.value,
    }

    this.props.onSave(properties)
  },

  render() {
    const {options} = this.props.config
    const {token} = options
    const chatID = options['chat-id']
    const disableNotification = options['disable-notification']
    const disableWebPagePreview = options['disable-web-page-preview']
    const parseMode = options['parse-mode']

    return (
      <form onSubmit={this.handleSaveAlert}>
        <p className="no-user-select">
          You need a
          {' '}
          <a
            href="https://docs.influxdata.com/kapacitor/v1.2/guides/event-handler-setup/#telegram-bot"
            target="_blank"
          >
            Telegram Bot
          </a>
          {' '}
          to use this endpoint
        </p>
        <div className="form-group col-xs-12">
          <label htmlFor="token">
            Token
            <QuestionMarkTooltip
              tipID="token"
              tipContent={TELEGRAM_TOKEN_TIP}
            />
          </label>
          <RedactedInput
            defaultValue={token}
            id="token"
            refFunc={r => (this.token = r)}
          />
        </div>

        <div className="form-group col-xs-12">
          <label htmlFor="chat-id">
            Chat ID
            <QuestionMarkTooltip
              tipID="chat-id"
              tipContent={TELEGRAM_CHAT_ID_TIP}
            />
          </label>
          <input
            className="form-control"
            id="chat-id"
            type="text"
            placeholder="your-telegram-chat-id"
            ref={r => (this.chatID = r)}
            defaultValue={chatID || ''}
          />
        </div>

        <div className="form-group col-xs-12">
          <label htmlFor="parseMode">Select the alert message format</label>
          <div className="form-control-static">
            <div className="radio">
              <input
                id="parseModeMarkdown"
                type="radio"
                name="parseMode"
                value="markdown"
                defaultChecked={parseMode !== 'HTML'}
                ref={r => (this.parseModeMarkdown = r)}
              />
              <label htmlFor="parseModeMarkdown">Markdown</label>
            </div>
            <div className="radio">
              <input
                id="parseModeHTML"
                type="radio"
                name="parseMode"
                value="html"
                defaultChecked={parseMode === 'HTML'}
                ref={r => (this.parseModeHTML = r)}
              />
              <label htmlFor="parseModeHTML">HTML</label>
            </div>
          </div>
        </div>

        <div className="form-group col-xs-12">
          <div className="form-control-static">
            <input
              id="disableWebPagePreview"
              type="checkbox"
              defaultChecked={disableWebPagePreview}
              ref={r => (this.disableWebPagePreview = r)}
            />
            <label htmlFor="disableWebPagePreview">
              Disable
              {' '}
              <a href="https://telegram.org/blog/link-preview" target="_blank">
                link previews
              </a>
              {' '}
              in alert messages.
            </label>
          </div>
        </div>

        <div className="form-group col-xs-12">
          <div className="form-control-static">
            <input
              id="disableNotification"
              type="checkbox"
              defaultChecked={disableNotification}
              ref={r => (this.disableNotification = r)}
            />
            <label htmlFor="disableNotification">
              Disable notifications on iOS devices and disable sounds on Android devices. Android users continue to receive notifications.
            </label>
          </div>
        </div>

        <div className="form-group-submit col-xs-12 text-center">
          <button className="btn btn-primary" type="submit">
            Update Telegram Config
          </button>
        </div>
      </form>
    )
  },
})

export default TelegramConfig
