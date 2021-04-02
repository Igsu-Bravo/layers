import { Component, expose, validators } from "@layr/component";
import { ComponentHTTPServer } from "@layr/component-http-server";
import { MemoryStore } from "@layr/memory-store";
import { Storable, primaryIdentifier, attribute } from "@layr/storable";

const { notEmpty, maxLength } = validators;

@expose({
  find: { call: true },
  prototype: {
    load: { call: true },
    save: { call: true },
  },
})
export class Message extends Storable(Component) {
  // The expose decorator allows "name" to be set remotely
  @expose({ set: true, get: true }) @primaryIdentifier() id!: string;

  @expose({ get: true, set: true })
  @attribute("string", { validators: [notEmpty(), maxLength(300)] })
  text = "";

  @expose({ get: true }) @attribute("Date") createdAt = new Date();
}

const store = new MemoryStore();

store.registerStorable(Message);

const server = new ComponentHTTPServer(Message, { port: 3210 });

server.start();
