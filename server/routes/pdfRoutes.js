const express = require('express')
const router = express.Router()
const PDFDocument = require('pdfkit')
const Room = require('../models/Room')
const Bid = require('../models/Bid')
const Team = require('../models/Team')
const { protect } = require('../middleware/authMiddleware')

router.get('/:roomCode', protect, async (req, res) => {
  try {
    const room = await Room.findOne({ roomCode: req.params.roomCode })
      .populate('hostId', 'name')
      .populate('participants', 'name email')

    if (!room) return res.status(404).json({ message: 'Room not found' })

    const bids = await Bid.find({ roomId: room._id })
      .populate('playerId')
      .populate('soldTo', 'name')
      .sort({ createdAt: 1 })

    const teams = await Team.find({ roomId: room._id })
      .populate('userId', 'name')
      .populate('players')

    const doc = new PDFDocument({ margin: 40, size: 'A4' })

    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename=BidExpert11_${room.roomCode}_Results.pdf`)
    doc.pipe(res)

    // ── Header ──
    doc.rect(0, 0, doc.page.width, 80).fill('#14532D')
    doc.fillColor('white').fontSize(24).font('Helvetica-Bold')
       .text('BidExpert11', 40, 20)
    doc.fontSize(11).font('Helvetica')
       .text('Fantasy Cricket Auction Results', 40, 50)
    doc.fillColor('#F59E0B').fontSize(11)
       .text(`Room: ${room.roomCode}  |  Host: ${room.hostId?.name}  |  Purse: ₹${room.pursePerTeam} Cr`, 40, 65)

    doc.moveDown(3)

    // ── Summary ──
    const soldCount = bids.filter(b => b.status === 'sold').length
    const unsoldCount = bids.filter(b => b.status === 'unsold').length
    const totalSpent = bids.reduce((s, b) => s + (b.soldPrice || 0), 0)

    doc.fillColor('#14532D').fontSize(14).font('Helvetica-Bold')
       .text('Auction Summary', 40, doc.y)
    doc.moveDown(0.3)

    const summaryY = doc.y
    doc.rect(40, summaryY, doc.page.width - 80, 60).fill('#F0FDF4').stroke('#14532D')
    doc.fillColor('#1a1a1a').fontSize(10).font('Helvetica')
    doc.text(`Total Players: ${soldCount + unsoldCount}`, 55, summaryY + 10)
    doc.text(`Sold: ${soldCount}`, 55, summaryY + 25)
    doc.text(`Unsold: ${unsoldCount}`, 55, summaryY + 40)
    doc.text(`Total Spent: ₹${totalSpent.toFixed(2)} Cr`, 250, summaryY + 10)
    doc.text(`Teams: ${room.participants?.length}`, 250, summaryY + 25)
    doc.text(`Timer: ${room.bidTimer || 15}s per bid`, 250, summaryY + 40)

    doc.moveDown(4)

    // ── Team Squads ──
    doc.fillColor('#14532D').fontSize(14).font('Helvetica-Bold')
       .text('Team Squads', 40, doc.y)
    doc.moveDown(0.5)

    for (const team of teams) {
      const teamBids = bids.filter(b =>
        b.soldTo?._id?.toString() === team.userId?._id?.toString()
      )
      const teamSpent = teamBids.reduce((s, b) => s + (b.soldPrice || 0), 0)
      const remaining = room.pursePerTeam - teamSpent

      // Team header
      const teamY = doc.y
      if (teamY > doc.page.height - 150) { doc.addPage(); }

      doc.rect(40, doc.y, doc.page.width - 80, 22).fill('#14532D')
      doc.fillColor('white').fontSize(11).font('Helvetica-Bold')
         .text(`${team.userId?.name}'s Team`, 50, doc.y + 5)
      doc.text(`Spent: ₹${teamSpent.toFixed(2)} Cr  |  Remaining: ₹${remaining.toFixed(2)} Cr`, 300, doc.y - 11, { align: 'right', width: doc.page.width - 340 })
      doc.moveDown(0.2)

      // Column headers
      const rowY = doc.y + 5
      doc.rect(40, rowY, doc.page.width - 80, 16).fill('#E8F5E9')
      doc.fillColor('#14532D').fontSize(9).font('Helvetica-Bold')
      doc.text('#', 45, rowY + 3)
      doc.text('Player', 65, rowY + 3)
      doc.text('Role', 280, rowY + 3)
      doc.text('Price', 420, rowY + 3)
      doc.moveDown(0.8)

      // Players
      teamBids.forEach((bid, idx) => {
        if (doc.y > doc.page.height - 60) { doc.addPage() }
        const py = doc.y
        const bg = idx % 2 === 0 ? 'white' : '#F9FBF9'
        doc.rect(40, py, doc.page.width - 80, 16).fill(bg)
        doc.fillColor('#1a1a1a').fontSize(9).font('Helvetica')
        doc.text(`${idx + 1}`, 45, py + 3)
        doc.text(bid.playerId?.name || '-', 65, py + 3)
        doc.text(bid.playerId?.role || '-', 280, py + 3)
        const price = bid.soldPrice < 1
          ? `₹${(bid.soldPrice * 100).toFixed(0)} L`
          : `₹${bid.soldPrice.toFixed(2)} Cr`
        doc.fillColor('#14532D').text(price, 420, py + 3)
        doc.moveDown(0.6)
      })

      if (teamBids.length === 0) {
        doc.fillColor('#999').fontSize(9).font('Helvetica-Oblique')
           .text('No players bought', 50, doc.y)
        doc.moveDown(0.5)
      }

      doc.moveDown(0.5)
    }

    // ── Sold Players ──
    if (doc.y > doc.page.height - 200) doc.addPage()
    doc.moveDown(0.5)
    doc.fillColor('#14532D').fontSize(14).font('Helvetica-Bold')
       .text('All Sold Players', 40, doc.y)
    doc.moveDown(0.3)

    const headerY = doc.y
    doc.rect(40, headerY, doc.page.width - 80, 16).fill('#14532D')
    doc.fillColor('white').fontSize(9).font('Helvetica-Bold')
    doc.text('#', 45, headerY + 3)
    doc.text('Player', 65, headerY + 3)
    doc.text('Role', 230, headerY + 3)
    doc.text('Sold To', 330, headerY + 3)
    doc.text('Price', 450, headerY + 3)
    doc.moveDown(0.8)

    const soldBids = bids.filter(b => b.status === 'sold')
    soldBids.forEach((bid, idx) => {
      if (doc.y > doc.page.height - 60) doc.addPage()
      const py = doc.y
      doc.rect(40, py, doc.page.width - 80, 16).fill(idx % 2 === 0 ? 'white' : '#F9FBF9')
      doc.fillColor('#1a1a1a').fontSize(9).font('Helvetica')
      doc.text(`${idx + 1}`, 45, py + 3)
      doc.text(bid.playerId?.name || '-', 65, py + 3)
      doc.text(bid.playerId?.role || '-', 230, py + 3)
      doc.text(bid.soldTo?.name || '-', 330, py + 3)
      const price = bid.soldPrice < 1
        ? `₹${(bid.soldPrice * 100).toFixed(0)} L`
        : `₹${bid.soldPrice.toFixed(2)} Cr`
      doc.fillColor('#14532D').text(price, 450, py + 3)
      doc.moveDown(0.6)
    })

    // ── Footer ──
    doc.moveDown(1)
    doc.rect(40, doc.y, doc.page.width - 80, 30).fill('#14532D')
    doc.fillColor('white').fontSize(9).font('Helvetica')
       .text('Generated by BidExpert11 — Fantasy Cricket Auction Platform', 40, doc.y + 10, {
         align: 'center', width: doc.page.width - 80
       })

    doc.end()
  } catch (error) {
    console.error('PDF error:', error)
    res.status(500).json({ message: 'PDF generation failed' })
  }
})

module.exports = router