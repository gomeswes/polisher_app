class SentencesController < ApplicationController
  def new  
  end

  def create
    sentence_params = params["sentence"]
    sentence = Sentence.new sentence_params["english"], sentence_params["polish"]
    sentence.save!
  end

  def show
    @sentences = Sentence.all
  end

  def play
    cat = params['cat']
    if cat == nil
      @sentence = Sentence.first if cat == nil
    else
      @sentence = Sentence.where(:category => cat)
    end
    @sentence = Sentence.new '','' unless @sentence
    @categories = Category.all.map {|c| c.name }.to_a
  end

  def get_new
    ids_to_ignore= params["ids_to_ignore"]
    sentence = Sentence.where("id NOT IN (?)", ids_to_ignore).first
    respond_to do |format|
      format.json do
        render json: sentence
      end
    end
  end
end