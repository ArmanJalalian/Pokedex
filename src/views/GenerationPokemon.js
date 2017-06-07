/**
 * Created by Arman Jalalian on 5/31/2017.
 */
import {View} from 'backbone';
import _ from 'underscore';

const GenerationPokemon = View.extend({
    templateGenerations: '',
    templateError: '',
    initialize: function () {
        this.templateGenerations = _.template(this.$('#template-generations').html());
        this.templateError = _.template(this.$('#template-error').html());

        App.events.on('newGeneration', this.loadGenerations, this);
    },
    loadGenerations: function (data) {
        this.collection.id = data.id;
        this.collection.fetch({
            success: (collection) => this.loadGenerationsSuccessHandler(collection),
            error: (collection) => this.loadGenerationsErrorHandler(collection),
        });
    },
    loadGenerationsSuccessHandler: function (collection) {
        this.$el.html(this.templateGenerations({generations: collection.models}));
        //console.log(collection.toJSON());
    },
    loadGenerationsErrorHandler: function (collection, response) {
        this.$el.html(this.templateError({message: response.responseJSON.error}));
        console.log(collection);
    }
});

export default GenerationPokemon;