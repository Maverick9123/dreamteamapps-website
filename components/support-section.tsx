              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-gray-500 text-xs mb-1">PlayListAI Support</div>
                <div className="text-teal-300 text-sm font-medium">support@dreamteamapps.com</div>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full border-teal-500/30 text-teal-300 hover:bg-teal-500/10 hover:text-teal-200"
              onClick={() => window.location.href = "mailto:support@dreamteamapps.com"}
            >
              Send an Email <Mail className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
